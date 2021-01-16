import { Result } from '../../../../shared/core/result'
import { ValueObject } from '../../../../shared/domain/value-object'
import { ClubValueObjectErrors } from './errors'

export interface ClubEmailProps {
  value: string
}

export class ClubEmail extends ValueObject<ClubEmailProps> {
  public static create(email: string): Result<ClubEmail, ClubValueObjectErrors.InvalidEmail> {
    if (!this.isValidEmail(email)) {
      return Result.err(new ClubValueObjectErrors.InvalidEmail(email))
    } else {
      return Result.ok(new ClubEmail({ value: this.format(email) }))
    }
  }

  private constructor(props: ClubEmailProps) {
    super(props)
  }

  private static isValidEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    // const waterlooDomain = '@uwaterloo.ca'
    
    // assuming club emails are not necessarily associated w/ UW. 
    // verification policy TBD

    const isValidEmail = re.test(email)
    // const isWaterlooEmail =
    //   email.indexOf(waterlooDomain, email.length - waterlooDomain.length) !== -1

    return isValidEmail //&& isWaterlooEmail
  }

  private static format(email: string): string {
    return email.trim().toLowerCase()
  }

  get value(): string {
    return this.props.value
  }
}
