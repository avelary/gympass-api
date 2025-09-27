import { email, z } from 'zod'

export const UserBodySchema = z.object({
  name: z.string().min(3, 'name must contain at least 3 characters').max(30),
  email: z.email(),
  password: z.string().trim().min(6, 'password must contain at least 6 characters').max(20)
})