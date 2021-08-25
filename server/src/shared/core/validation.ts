import { isRight, Either, left, right } from 'fp-ts/lib/Either'
import * as t from 'io-ts'
import { Result } from './result'

// Helper functions for type validation (io-ts).

export function tEnum<Value>(name: string, sEnum: Record<string, Value>): t.Type<Value> {
  const isValue = (input: unknown): input is Value => Object.values<unknown>(sEnum).includes(input)
  return new t.Type<Value>(
    name,
    isValue,
    (input, context) => (isValue(input) ? t.success(input) : t.failure(input, context)),
    t.identity
  )
}

export function toResult<L, R>(either: Either<L, R>): Result<R, L> {
  return isRight(either) ? Result.ok(either.right) : Result.err(either.left)
}

export function toEither<L, R>(result: Result<R, L>): Either<L, R> {
  return result.isOk() ? right(result.value) : left(result.error)
}
