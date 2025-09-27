import { expect, describe, it, beforeEach} from 'vitest'
import { CreateGymUseCase } from '../create-gym'
import { InMemoryGynsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gynsRepository: InMemoryGynsRepository
let sut: CreateGymUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    gynsRepository = new InMemoryGynsRepository()
    sut = new CreateGymUseCase(gynsRepository)
  })

  it('should be able to register', async () => {
    const { gym } =  await sut.create({
      title: 'JavaScript Gym',
      description: null, 
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})