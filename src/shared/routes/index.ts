import { authenticateRoutes } from '@/modules/authenticate/routes';
import { checkInsRoutes } from '@/modules/check-ins/routes';
import { gymsRoutes } from '@/modules/gym/routes';
import { userRoutes } from '@/modules/user/routes';
import type { FastifyTypedInstance } from '@/shared/types/provider';

export async function registerRoutes(app: FastifyTypedInstance) {
    app.register(userRoutes, {prefix: '/users'})
    app.register(authenticateRoutes)
    app.register(gymsRoutes, {prefix: '/gyms'})
    app.register(checkInsRoutes, {prefix: '/check-ins'})
}