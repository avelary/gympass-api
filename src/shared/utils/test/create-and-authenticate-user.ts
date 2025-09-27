import request from 'supertest'
import type { FastifyInstance } from 'fastify/types/instance'
import { prisma } from '@/shared/database/prisma'
import { hash } from 'bcryptjs'

export async function createAndAuthenticateUser(app: FastifyInstance, isManager = false){
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@examplo.com',
      password_hash: await hash('123456', 8),
      role: isManager ? 'manager' : 'user'
    }
  })

    const authResponse = await request(app.server)
      .post('/sessions')
      .send({email: 'johndoe@examplo.com', password: '123456'})

    const { token } = authResponse.body

    return { token }
}
