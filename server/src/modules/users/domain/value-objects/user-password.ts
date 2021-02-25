import bcrypt from 'bcrypt'

import { Result } from '../../../../shared/core/result'
import { ValueObject } from '../../../../shared/domain/value-object'
import { UserValueObjectErrors } from './errors'

export interface UserPasswordProps {
  value: string
  hashed: boolean
}

export class UserPassword extends ValueObject<UserPasswordProps> {
  public static minLength: number = 6

  public static create(
    props: UserPasswordProps
  ): Result<UserPassword, UserValueObjectErrors.InvalidPassword> {
    if (!props.hashed && !this.isAppropriateLength(props.value)) {
      return Result.err(
        new UserValueObjectErrors.InvalidPassword(`Password doesn't meet criteria [${this.minLength} chars min].`)
      )
    }

    return Result.ok(
      new UserPassword({
        value: props.value,
        hashed: props.hashed,
      })
    )
  }

  private constructor(props: UserPasswordProps) {
    super(props)
  }

  private static isAppropriateLength(password: string): boolean {
    return password.length >= this.minLength
  }

  get value(): string {
    return this.props.value
  }

  public isAlreadyHashed(): boolean {
    return this.props.hashed
  }

  public getHashedValue(): Promise<string> {
    return new Promise((resolve) => {
      if (this.isAlreadyHashed()) {
        return resolve(this.props.value)
      } else {
        return resolve(this.hashPassword(this.props.value))
      }
    })
  }

  private hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) return reject(err)
        resolve(hash)
      })
    })
  }

  public async comparePassword(hashedPassword: string): Promise<Result<boolean, UserValueObjectErrors.InvalidPasswordComparison>> {
    if (this.isAlreadyHashed()) return Result.err(new UserValueObjectErrors.InvalidPasswordComparison("Comparing two hashed passwords"))
    return Result.ok(await this.bcryptCompare(this.value, hashedPassword))
  }

  private bcryptCompare(plainText: string, hashed: string): Promise<boolean> {
    return new Promise((resolve, _reject) => {
      bcrypt.compare(plainText, hashed, (err, compareResult) => {
        if (err) return resolve(false)
        return resolve(compareResult)
      })
    })
  }
}
