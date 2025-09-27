import { string, z } from 'zod'
import { AuthenticateBodySchema } from './schema'

export const authenticateDocs = {
  tags: ['Authenticate'],
  description: 'Autheticate user',
  body: AuthenticateBodySchema, 
  response: {
    200: z.object({
      token: string()
    })
  }
}

export const getUserProfileDocs = {
  tags: ['Authenticate'],
  description: 'Get user profile.',
  response: {
    200: z.object({
      user: z.object({
        id: z.string(),
        name: z.string(),
        email: z.email(),
        role: z.string(),
      }),
    }),
  },
}