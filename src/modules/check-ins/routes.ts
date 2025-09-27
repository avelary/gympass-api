import type { FastifyTypedInstance } from '@/shared/types/provider'
import { create, history, metrics, validate } from './controller'
import { createCheckInDocs, historyCheckInDocs, metricsCheckInDocs } from './swagger' 
import { verifyJWT } from '@/shared/middleware/verify-jwt'
import { verifyUserRole } from '@/shared/middleware/verify-user-role'


export async function checkInsRoutes(app: FastifyTypedInstance) {
  app.addHook('preHandler', verifyJWT)

  app.post('/gyms/:gymId', {schema: createCheckInDocs}, create)
  app.get('/history', {schema: historyCheckInDocs}, history)
  app.get('/metrics', {schema: metricsCheckInDocs}, metrics)
  app.patch('/:checkInId/validate', {preHandler: verifyUserRole('manager')}, validate)
}
