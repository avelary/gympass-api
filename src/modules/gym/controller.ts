import { FastifyRequest, FastifyReply } from "fastify";
import { makeCreateGymUseCase } from "@/use-cases/factories/make-create-gym-use-case";
import { makeSearchGymsUseCase } from "@/use-cases/factories/make-search-gyms-use-case";
import { GymBodySchema, NearByGymsQuerySchema, SearchGymsQuerySchema } from "./schema"; 
import { makeFetchNearbyGymsUseCase } from "@/use-cases/factories/make-fatch-nearby-gyms-use-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const { title, description, phone, latitude, longitude } = GymBodySchema.parse(request.body)
  const createGymUseCase = makeCreateGymUseCase()

  await createGymUseCase.create({ title, description, phone, latitude, longitude })
  
  return reply.status(201).send({message: 'Gym created successfully.'})
}

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const { query, page } = SearchGymsQuerySchema.parse(request.query)
  const searchGymUseCase = makeSearchGymsUseCase()

  const gyms = await searchGymUseCase.execute({ query, page })
  
  return reply.status(200).send(gyms)
}

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const { latitude, longitude } = NearByGymsQuerySchema.parse(request.query)
  const nearbyGymUseCase = makeFetchNearbyGymsUseCase()

  const gyms = await nearbyGymUseCase.execute({ userLatitude: latitude, userLongitude: longitude })
  
  return reply.status(200).send(gyms)
}