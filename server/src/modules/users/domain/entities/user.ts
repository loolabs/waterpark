import { Result } from '../../../../shared/core/result'
import { AggregateRoot } from '../../../../shared/domain/aggregate-root'
import { UniqueEntityID } from '../../../../shared/domain/unique-entity-id'
import { UserCreated } from '../events/user-created'
import { UserDeleted } from '../events/user-deleted'
import { UserLoggedIn } from '../events/user-logged-in'
import { JWTToken, RefreshToken } from '../value-objects/jwt'
import { UserEmail } from '../value-objects/user-email'
import { UserPassword } from '../value-objects/user-password'
import { UserId } from '../value-objects/userId'

interface UserProps {
  email: UserEmail
  password: UserPassword
  emailVerified?: boolean
  accessToken?: JWTToken
  refreshToken?: RefreshToken
  isDeleted?: boolean
  lastLogin?: Date
}

export class User extends AggregateRoot<UserProps> {
  public static create(props: UserProps, id?: UniqueEntityID): Result<User, Error> {
    const isNewUser = !!id === false
    const user = new User(
      {
        ...props,
      },
      id
    )

    if (isNewUser) user.addDomainEvent(new UserCreated(user))

    return Result.ok(user)
  }

  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id)
  }

  public setAccessToken(token: JWTToken, refreshToken: RefreshToken): void {
    this.addDomainEvent(new UserLoggedIn(this))
    this.props.accessToken = token
    this.props.refreshToken = refreshToken
    this.props.lastLogin = new Date()
  }

  public isLoggedIn(): boolean {
    return !!this.props.accessToken && !!this.props.refreshToken
  }

  public delete(): void {
    if (!this.props.isDeleted) {
      this.addDomainEvent(new UserDeleted(this))
      this.props.isDeleted = true
    }
  }

  get userId(): UserId {
    const userIdResult = UserId.create(this._id)
    if (userIdResult.isOk()) return userIdResult.value
    else throw new Error('Could not create UserId instance')
  }

  get email(): UserEmail {
    return this.props.email
  }

  get password(): UserPassword {
    return this.props.password
  }

  get accessToken(): string | undefined {
    return this.props.accessToken
  }

  get isDeleted(): boolean | undefined {
    return this.props.isDeleted
  }

  get isEmailVerified(): boolean | undefined {
    return this.props.emailVerified
  }

  get lastLogin(): Date | undefined {
    return this.props.lastLogin
  }

  get refreshToken(): RefreshToken | undefined {
    return this.props.refreshToken
  }
}
