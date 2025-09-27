import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "../check-in";
import { InMemoryGynsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxNumberOfCheckIns } from "../errors/max-number-of-check-ins-error";
import { MaxDistanceError } from "../errors/max-distance-error";

let checkInsRepository: InMemoryCheckInsRepository
let gynsRepository: InMemoryGynsRepository
let sut: CheckInUseCase

describe('Get User Profile Use Case', () => {
  beforeEach( async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gynsRepository = new InMemoryGynsRepository()
    sut = new CheckInUseCase(checkInsRepository, gynsRepository)

    await gynsRepository.create({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })
  

  it('should be able to check in', async () => {
   const { checkIn } = await sut.create({
      userId: 'user01',
      gymId: 'gym-01',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    
    await sut.create({
      userId: 'user01',
      gymId: 'gym-01',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091
    })
    
    await expect(() => sut.create({
      userId: 'user01',
      gymId: 'gym-01',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091
    })).rejects.toBeInstanceOf(MaxNumberOfCheckIns)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    
    await sut.create({
      userId: 'user01',
      gymId: 'gym-01',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))
    
    const { checkIn } = await sut.create({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091
    })

    expect( checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {

    gynsRepository.items.push({
      id: 'gym-02',
      title: 'Javascript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-27.0747279),
      longitude: new Decimal(-49.4889672),
    })

    await expect(() => sut.create({
      userId: 'user01',
      gymId: 'gym-02',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091
    })).rejects.toBeInstanceOf(MaxDistanceError)

  })
})