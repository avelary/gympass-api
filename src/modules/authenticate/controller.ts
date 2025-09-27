import { FastifyRequest, FastifyReply } from 'fastify'
import { AuthenticateBodySchema } from './schema'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticaterUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
 
export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const { email, password } = AuthenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticaterUseCase()

    const { user } = await authenticateUseCase.authenticate({ email, password })

    const token = await reply.jwtSign(
      { sub: user.id, role: user.role }
    )

    const refreshtoken = await reply.jwtSign(
      { sub: user.id, role: user.role },
      { expiresIn: '7d' } 
    )

    return reply.setCookie('refreshToken', refreshtoken, {path: '/', secure: true, sameSite: true, httpOnly: true}).status(200).send({token})

  } catch (error) {
    if(error instanceof InvalidCredentialsError) {
      return reply.status(400).send({message: error.message})
    }

    throw error
  }
}

export async function refresh(request: FastifyRequest, reply: FastifyReply){
  await request.jwtVerify({ onlyCookie: true })

  const token = await reply.jwtSign(
      { sub: request.user.sub, role: request.user.role }
    )

    const refreshtoken = await reply.jwtSign(
      { sub: request.user.sub, role: request.user.role },
      { expiresIn: '7d' } 
    )

    return reply.setCookie('refreshToken', refreshtoken, {path: '/', secure: true, sameSite: true, httpOnly: true}).status(200).send({token})
} 


export async function profile(request: FastifyRequest, reply: FastifyReply){
  const getUserProfile = makeGetUserProfileUseCase()

  const { user } = await getUserProfile.getUserProfile({
    userId: request.user.sub
  })

  const { password_hash: _, ...securedata } = user

  return reply.status(200).send({ user: securedata })
}