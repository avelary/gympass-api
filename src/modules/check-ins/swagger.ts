import { z } from 'zod'
import { CheckInBodySchema } from './schema'

export const createCheckInDocs = { 
  tags: ['Check-in'], 
  description: 'Create a new check-in.', 
  body: CheckInBodySchema,
  response: { 
    200: z.object({
      message: z.string().describe('Check in created successfully.')
    })
  }
}


export const historyCheckInDocs = { 
  tags: ['Check-in'], 
  description: 'Get checkin history.', 
  response: { 
    200: z.object({ 
      checkIns: z.array(z.object({ 
        id: z.string(), 
        created_at: z.date(), 
        validated_at: z.date().nullable(), 
        user_id: z.string(), 
        gym_id: z.string() 
      })) 
    }) 
  } 
}

export const metricsCheckInDocs = { 
  tags: ['Check-in'], 
  description: 'Get checkin metrics.', 
  response: { 
    200: z.object({
      checkInsCount: z.number()
    })
  } 
}