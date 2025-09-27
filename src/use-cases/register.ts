import { hash } from "bcryptjs"
import type { UsersRepository } from "@/repositories/interface-user-repository"
import { UserAlreadyExistsError } from "./errors/user-already-exists"
import type { User } from "@prisma/client"

interface registerUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository){}

  async create({name, email, password}: registerUseCaseRequest): Promise<RegisterUseCaseResponse> {

    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    if(userWithSameEmail){
      throw new UserAlreadyExistsError()
    }

    const password_hash = await hash(password, 8)

    const user = await this.usersRepository.create({ name, email, password_hash })
    return { user }
  }

}

