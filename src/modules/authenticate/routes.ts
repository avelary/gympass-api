import type { FastifyTypedInstance } from '@/shared/types/provider';
import { authenticate, profile, refresh } from './controller';
import { authenticateDocs, getUserProfileDocs } from './swagger';
import { verifyJWT } from '@/shared/middleware/verify-jwt';

export async function authenticateRoutes(app: FastifyTypedInstance) {
  app.post('/sessions', { schema: authenticateDocs }, authenticate)
  app.patch('/token/refresh', refresh)

  //PRIVATE:
  app.get('/me', {preHandler: verifyJWT, schema: getUserProfileDocs}, profile)
}
