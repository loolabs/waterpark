import bcrypt from 'bcrypt'

import { Result } from '../../../../shared/core/result'
import { ValueObject } from '../../../../shared/domain/value-object'
import { ClubValueObjectErrors } from './errors'

export interface ClubPasswordProps {
  value: string
  hashed: boolean
}

export class ClubPassword extends ValueObject<ClubPasswordProps> {
  public static minLength: number = 6

  public static create(
    props: ClubPasswordProps
  ): Result<ClubPassword, ClubValueObjectErrors.InvalidPassword> {
    if (!props.hashed && !this.isAppropriateLength(props.value)) {
      return Result.err(
        new ClubValueObjectErrors.InvalidPassword(`Password doesn't meet criteria [8 chars min].`)
      )
    }

    return Result.ok(
      new ClubPassword({
        value: props.value,
        hashed: props.hashed,
      })
    )
  }

  private constructor(props: ClubPasswordProps) {
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

  public async comparePassword(plainTextPassword: string): Promise<boolean> {
    let hashed: string

    if (this.isAlreadyHashed()) {
      hashed = this.props.value
      return this.bcryptCompare(plainTextPassword, hashed)
    } else {
      return this.props.value === plainTextPassword
    }
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
