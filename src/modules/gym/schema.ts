import { z } from 'zod'

export const GymBodySchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
  phone: z.string().nullable(),
  latitude: z.number().refine(value => {return Math.abs(value) <= 90}),
  longitude: z.number().refine(value => {return Math.abs(value) <= 180})
})

export const SearchGymsQuerySchema = z.object({
  query: z.string(),
  page: z.coerce.number().min(1).default(1)
})

export const NearByGymsQuerySchema = z.object({
  latitude: z.coerce.number().refine(value => {return Math.abs(value) <= 90}),
  longitude: z.coerce.number().refine(value => {return Math.abs(value) <= 180})
})