import { describe, it, beforeEach, vi, afterEach, expect } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in use case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'Javascript gym',
      description: null,
      phone: null,
      latitude: -27.6554539,
      longitude: -27.6554539,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-id',
      userLatitude: -27.6554539,
      userLongitude: -27.6554539,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not to be able to check in twice on the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 10, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-id',
      userLatitude: -27.6554539,
      userLongitude: -27.6554539,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-id',
        userLatitude: -27.6554539,
        userLongitude: -27.6554539,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice but on different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 10, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-id',
      userLatitude: -27.6554539,
      userLongitude: -27.6554539,
    })

    vi.setSystemTime(new Date(2022, 0, 11, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-id',
      userLatitude: -27.6554539,
      userLongitude: -27.6554539,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not to be able to check in on distant gym', async () => {
    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-id',
        userLatitude: -28.6554539,
        userLongitude: -28.6554539,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
