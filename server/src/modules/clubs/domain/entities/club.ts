import { Result } from '../../../../shared/core/result'
import { AggregateRoot } from '../../../../shared/domain/aggregate-root'
import { UniqueEntityID } from '../../../../shared/domain/unique-entity-id'
import { ClubCreated } from '../events/club-created'
import { ClubId } from '../value-objects/clubId'

interface ClubProps {
  name: string
  description: string
}

export class Club extends AggregateRoot<ClubProps> {
  public static create(props: ClubProps, id?: UniqueEntityID): Result<Club, Error> {
    const isNewClub = id === undefined
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


  get clubId(): ClubId {
    const clubIdResult = ClubId.create(this._id)
    if (clubIdResult.isOk()) return clubIdResult.value
    else throw new Error('Could not create ClubId instance')
  }

  get name(): string {
    return this.props.name
  }

  get description(): string {
    return this.props.description
  }

}
