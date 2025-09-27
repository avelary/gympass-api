import { FastifyRequest, FastifyReply } from "fastify";
import { UserBodySchema } from "./schema";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";
 
export async function create(request: FastifyRequest, reply: FastifyReply) {
  const { name, email, password } = UserBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.create({ name, email, password })
  } catch (error) {
    if(error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({message: error.message})
    }

    throw error
  }

  return reply.status(201).send({message: 'user created successfully.'})
}