import { z } from 'zod'
import { Result } from './result'

export class ValidationError extends z.ZodError {}

export function merge<T1, T2>(
  result1: Result<T1, ValidationError>,
  result2: Result<T2, ValidationError>
): Result<T1 & T2, ValidationError> {
  if (result1.isOk() && result2.isOk()) {
    return Result.ok({ ...result1.value, ...result2.value })
  }
  const error = ValidationError.create([])
  if (result1.isErr()) error.addIssues(result1.error.issues)
  if (result2.isErr()) error.addIssues(result2.error.issues)
  return Result.err(error)
}
