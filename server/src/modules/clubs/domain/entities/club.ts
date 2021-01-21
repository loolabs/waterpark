import { Result } from '../../../../shared/core/result'
import { AggregateRoot } from '../../../../shared/domain/aggregate-root'
import { UniqueEntityID } from '../../../../shared/domain/unique-entity-id'
import { ClubCreated } from '../events/club-created'
import { ClubDeleted } from '../events/club-deleted'
import { ClubId } from '../value-objects/clubId'

interface ClubProps {
  name: string 
  description: string
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


  get isDeleted(): boolean | undefined {
    return this.props.isDeleted
  }

}
