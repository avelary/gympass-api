import { z } from 'zod'
import { UserBodySchema } from './schema'

export const createUserDocs = {
  tags: ['User'],
  description: 'Create a new user.',
  body: UserBodySchema, 
  response: {
    201: z.object({
      message: z.string().describe('User created successfully.')
    })
  }
}