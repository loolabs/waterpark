import { Result } from '../../../../shared/core/result'
import { ValueObject } from '../../../../shared/domain/value-object'
import { UserValueObjectErrors } from './errors'

export interface UserEmailProps {
  value: string
}

export class UserEmail extends ValueObject<UserEmailProps> {
  public static create(email: string): Result<UserEmail, UserValueObjectErrors.InvalidEmail> {
    if (!this.isValidEmail(email)) {
      return Result.err(new UserValueObjectErrors.InvalidEmail(email))
    } else {
      return Result.ok(new UserEmail({ value: this.format(email) }))
    }
  }

  private constructor(props: UserEmailProps) {
    super(props)
  }

  private static isValidEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const waterlooDomain = '@uwaterloo.ca'

    const isValidEmail = re.test(email)
    const isWaterlooEmail =
      email.indexOf(waterlooDomain, email.length - waterlooDomain.length) !== -1

    return isValidEmail && isWaterlooEmail
  }

  private static format(email: string): string {
    return email.trim().toLowerCase()
  }

  get value(): string {
    return this.props.value
  }
}
