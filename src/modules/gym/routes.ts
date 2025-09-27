import type { FastifyTypedInstance } from '@/shared/types/provider'
import { verifyJWT } from '@/shared/middleware/verify-jwt'
import { create, nearby, search } from './controller'
import { createGymDocs, nearbyGymDocs, searchGymDocs } from './swagger'
import { verifyUserRole } from '@/shared/middleware/verify-user-role'

export async function gymsRoutes(app: FastifyTypedInstance) {
  app.addHook('preHandler', verifyJWT)

  app.post('/', { preHandler: verifyUserRole('manager'), schema: createGymDocs} ,create)
  app.get('/search', { schema: searchGymDocs}, search)
  app.get('/nearby', { schema: nearbyGymDocs}, nearby)
}
