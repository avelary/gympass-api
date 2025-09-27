import 'dotenv/config'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { Environment } from 'vitest/environments'
import { prisma } from '../../src/shared/database/prisma'

function generateDatabaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide DATABASE_URL env variable')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment> {
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    const schema = randomUUID()  
    const databaseUrl = generateDatabaseUrl(schema) 

    console.log('Usando URL do banco de dados para o esquema de testes:', databaseUrl)


    process.env.DATABASE_URL = databaseUrl

    
    execSync('npx prisma db push', { stdio: 'inherit' }) 

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
        await prisma.$disconnect()  
      }
    }
  }
}
