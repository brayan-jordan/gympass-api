import { describe, it, beforeEach, expect } from 'vitest'
import { GymsRepository } from '@/repositories/gyms-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: GymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch nearby gyms use case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -28.6554539,
      longitude: -28.6554539,
    })

    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -27.6554539,
      longitude: -27.6554539,
    })

    const { gyms } = await sut.execute({
      userLatitude: -27.6554549,
      userLongitude: -27.6554549,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Near Gym',
      }),
    ])
  })
})
