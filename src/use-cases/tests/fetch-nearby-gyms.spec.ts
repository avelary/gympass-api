import { InMemoryGynsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms";


let gynsRepository: InMemoryGynsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach( async () => {
    gynsRepository = new InMemoryGynsRepository()
    sut = new FetchNearbyGymsUseCase(gynsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gynsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -27.2092852,
      longitude: -49.6401091
    })

    await gynsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -27.0610928,
      longitude: -49.5229501
    })

    const { gyms } = await sut.execute({
      userLatitude: -27.2092852,
      userLongitude: -49.6401091
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Near Gym'}),
    ])
  })

})