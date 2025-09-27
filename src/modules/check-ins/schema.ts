import { z } from 'zod'

export const CheckInBodySchema = z.object({
  latitude: z.coerce.number().refine(value => {return Math.abs(value) <= 90}),
  longitude: z.coerce.number().refine(value => {return Math.abs(value) <= 180}) 
})

export const CheckInHistoryQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1)
})