import { FastifyError, FastifyInstance } from 'fastify'
import { AppError } from '../utils/app-error'
import { ZodError } from 'zod'

export function setupErrorHandling(app: FastifyInstance){
  app.setErrorHandler((error: FastifyError, _request, reply) => {
    if(error instanceof AppError){
      return reply.status(error.statusCode).send({
        message: error.message
      })
    }

    if(error instanceof ZodError){
      return reply.status(400).send({
        message: 'validation error',
        issues: error.format()
      })
    }

    console.error(error);

    return reply.status(500).send({
      message: 'internal server error',
      error: error.message
    })

  })
}