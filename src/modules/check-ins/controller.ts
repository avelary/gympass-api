import { FastifyRequest, FastifyReply } from "fastify"
import { CheckInHistoryQuerySchema, CheckInBodySchema } from "./schema"
import { makeCheckInUseCase } from "@/use-cases/factories/make-check-in-use-case"
import { makeFetchUserCheckInsHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-history-use-case"
import { makeGetUserMetricsUseCase } from "@/use-cases/factories/make-get-user-metrics-use-case"
import { makeValidateCheckInUseCase } from "@/use-cases/factories/make-validate-check-ins-use-case"


export async function create(request: FastifyRequest, reply: FastifyReply) {
  const { gymId } = request.params as {gymId: string}
  const { latitude, longitude } = CheckInBodySchema.parse(request.body)
  
  const checkInUseCase = makeCheckInUseCase()

  await checkInUseCase.create({
    userId: request.user.sub, 
    gymId, 
    userLatitude: latitude, 
    userLongitude: longitude 
  })
  
  return reply.status(201).send( {message: 'Check in created successfully.' })
}

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const { page } = CheckInHistoryQuerySchema.parse(request.query)
  
  const fetchUserCheckInHistoryUseCase = makeFetchUserCheckInsHistoryUseCase()

  const { checkIns } = await fetchUserCheckInHistoryUseCase.execute({ userId: request.user.sub ,page })
  
  return reply.status(200).send({ checkIns })
}

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getUserMetricsUseCase = makeGetUserMetricsUseCase()

  const { checkInsCount } = await getUserMetricsUseCase.execute({ userId: request.user.sub })
  
  return reply.status(200).send({ checkInsCount })
}

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const { checkInId } = request.params as {checkInId: string}
  
  const validateCheckInUseCase = makeValidateCheckInUseCase()

  await validateCheckInUseCase.execute({ checkInId })
  
  return reply.status(204).send()
}