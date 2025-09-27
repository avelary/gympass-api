import { z } from 'zod';

export const AuthenticateBodySchema = z.object({
  email: z.email('Invalid email'),
  password: z.string().trim().min(6, 'password must contain at least 6 characters').max(20)
})