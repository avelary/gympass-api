import { FastifyRequest, FastifyReply } from 'fastify'

export function verifyUserRole(roleToVerify: 'user' | 'manager') {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const role = request.user.role

    if(role !== roleToVerify){
      return reply.status(400).send({message: 'Unauthorized.'})
    }
  }
}