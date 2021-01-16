import { Result } from '../../../../shared/core/result'
import { AggregateRoot } from '../../../../shared/domain/aggregate-root'
import { UniqueEntityID } from '../../../../shared/domain/unique-entity-id'
import { ClubCreated } from '../events/club-created'
import { ClubDeleted } from '../events/club-deleted'
// import { ClubLoggedIn } from '../events/club-logged-in'
// import { JWTToken, RefreshToken } from '../value-objects/jwt'
import { ClubId } from '../value-objects/clubId'

interface ClubProps {
  name: string //TODO: string for now, implement schema?
  description: string
  // accessToken?: JWTToken
  // refreshToken?: RefreshToken
  isDeleted?: boolean
}

export class Club extends AggregateRoot<ClubProps> {
  public static create(props: ClubProps, id?: UniqueEntityID): Result<Club, Error> {
    const isNewClub = !!id === false
    const club = new Club(
      {
        ...props,
      },
      id
    )

    if (isNewClub) club.addDomainEvent(new ClubCreated(club))

    return Result.ok(club)
  }

  private constructor(props: ClubProps, id?: UniqueEntityID) {
    super(props, id)
  }

  // public setAccessToken(token: JWTToken, refreshToken: RefreshToken): void {
  //   this.addDomainEvent(new ClubLoggedIn(this))
  //   this.props.accessToken = token
  //   this.props.refreshToken = refreshToken
  //   this.props.lastLogin = new Date()
  // }


  public delete(): void {
    if (!this.props.isDeleted) {
      this.addDomainEvent(new ClubDeleted(this))
      this.props.isDeleted = true
    }
  }

  get clubId(): ClubId {
    const clubIdResult = ClubId.create(this._id)
    if (clubIdResult.isOk()) return clubIdResult.value
    else throw new Error('Could not create ClubId instance')
  }

  get name(): string{
    return this.props.name
  }

  get description(): string{
    return this.props.description
  }

  // get accessToken(): string | undefined {
  //   return this.props.accessToken
  // }

  get isDeleted(): boolean | undefined {
    return this.props.isDeleted
  }

  // get lastLogin(): Date | undefined {
  //   return this.props.lastLogin
  // }

  // get refreshToken(): RefreshToken | undefined {
  //   return this.props.refreshToken
  // }
}
