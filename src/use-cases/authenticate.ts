import { UsersRepository } from "@/repositories/interface-user-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import type { User } from "@prisma/client";

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository){}

  async authenticate({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)
    if(!user){
      throw new InvalidCredentialsError
    }

    const doesPasswordMatches = await compare(password, user.password_hash)
    if(!doesPasswordMatches){
      throw new InvalidCredentialsError
    }

    return { user }
  }

}