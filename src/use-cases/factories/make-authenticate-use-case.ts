import { PrismaUsersRepository } from "@/repositories/prisma/prisma-user-repository"
import { AuthenticateUseCase } from "../authenticate"

export function makeAuthenticaterUseCase(){
  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUseCase
}