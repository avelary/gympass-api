import type { FastifyTypedInstance } from '@/shared/types/provider'
import { create } from './controller'
import { createUserDocs } from './swagger'

export async function userRoutes(app: FastifyTypedInstance) {
  app.post('/', {schema: createUserDocs }, create)
}
