import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { LateCheckInValidationError } from '@/use-cases/errors/late-check-in-validation-error'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  const validateCheckInUseCase = makeValidateCheckInUseCase()

  try {
    await validateCheckInUseCase.execute({
      checkInId,
    })

    return reply.status(204).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    if (err instanceof LateCheckInValidationError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
