export type Result<T, E> = Ok<T, E> | Err<T, E>

class Ok<T, E> {
  public constructor(public readonly value: T) {}

  public isOk(): this is Ok<T, E> {
    return true
  }

  public isErr(): this is Err<T, E> {
    return false
  }
}

export class Err<T, E> {
  public constructor(public readonly error: E) {}

  public isOk(): this is Ok<T, E> {
    return false
  }

  public isErr(): this is Err<T, E> {
    return true
  }
}

export namespace Result {
  export const ok = <T, E>(value: T): Result<T, E> => new Ok(value)
  export const err = <T, E>(error: E): Result<T, E> => new Err(error)
  export function resultsAllOk<T1, T2, E1, E2>(
    results: readonly [Result<T1, E1>, Result<T2, E2>]
  ): results is [Ok<T1, E1>, Ok<T2, E2>] {
    for (const result of results) {
      if (result.isErr()) return false
    }
    return true
  }

  export function getFirstError<T1, T2, E1, E2>(
    results: readonly [Result<T1, E1>, Result<T2, E2>]
  ): Err<T1, E1> | Err<T2, E2> {
    let err: Err<T1, E1> | Err<T2, E2> | null = null

    for (const result of results) {
      if (result.isErr()) {
        return (err = result)
      }
    }

    return err!
  }
}
