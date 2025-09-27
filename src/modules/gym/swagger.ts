import { z } from 'zod'
import { GymBodySchema } from './schema'

export const createGymDocs = {
  tags: ['Gym'],
  description: 'Create a new gym.',
  body: GymBodySchema, 
  response: {
    201: z.object({
      message: z.string().describe('Gym created successfully.')
    })
  }
}

export const searchGymDocs = {
  tags: ['Gym'],
  description: 'Search gyms.',
  response: {
    200: z.object({
      gyms: z.array(z.object({
      title: z.string(),
      description: z.string().nullable(),
      phone: z.string().nullable(),
      latitude: z.any(),
      longitude: z.any()
      }))
    })
  }
}

export const nearbyGymDocs = {
  tags: ['Gym'],
  description: 'Near by gyms.',
  response: {
    200: z.object({
      gyms: z.array(z.object({
      title: z.string(),
      description: z.string().nullable(),
      phone: z.string().nullable(),
      latitude: z.any(),
      longitude: z.any()
      }))
    })
  }
}