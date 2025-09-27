import type { Gym} from "@prisma/client"
import type { GymsRepository } from "@/repositories/interface-gyns-repository"

interface CreateGymUseCaseRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

  export class CreateGymUseCase {
    constructor(private gynsRepository: GymsRepository){}

    async create({title, description, phone, latitude, longitude}: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {

    const gym = await this.gynsRepository.create({ title, description,phone, latitude, longitude })
    return { gym }
  }
}

