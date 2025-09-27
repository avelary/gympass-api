import type { CheckIn} from "@prisma/client";
import type { CheckInsRepository } from "@/repositories/interface-check-ins-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import dayjs from "dayjs";
import { LateCheckInValidationError } from "./errors/late-check-in-validation-error";

interface CheckInUseCaseValidateRequest {
  checkInId: string
}

interface CheckInUseCaseValidateResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
  ){}

  async execute({ checkInId}: CheckInUseCaseValidateRequest): Promise<CheckInUseCaseValidateResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)
    if(!checkIn){
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if(distanceInMinutesFromCheckInCreation > 20){
      throw new LateCheckInValidationError
    }

    checkIn.validated_at = new Date()

    await this.checkInsRepository.save(checkIn)
  
    return { checkIn }
  }

}