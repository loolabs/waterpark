import { Result } from '../../../../shared/core/result'
import { AggregateRoot } from '../../../../shared/domain/aggregate-root'
import { UniqueEntityID } from '../../../../shared/domain/unique-entity-id'
import { ClubCreated } from '../events/club-created'
import { ClubId } from '../value-objects/clubId'

interface ClubProps {
  name: string
  description: string
  backgroundImageURL?: string
  iconURL: string
  facebookLink?: string
  twitterLink?: string
  instagramLink?: string
  websiteLink?: string
  tags: Array<string>
  events: Array<BasicEvent>
}

export type BasicEvent = {
  name: string
  startTime: Date
  endTime: Date
  backgroundImageURL?: string
  tags: Array<string>
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

  get backgroundImageURL(): string | undefined {
    return this.props.backgroundImageURL
  }
  
  get iconURL(): string {
    return this.props.iconURL
  }

  get facebookLink(): string | undefined {
    return this.props.facebookLink
  }

  get twitterLink(): string | undefined {
    return this.props.twitterLink
  }

  get instagramLink(): string | undefined {
    return this.props.instagramLink
  }

  get websiteLink(): string | undefined {
    return this.props.websiteLink
  }

  get tags(): Array<string> {
    return this.props.tags
  }

  get events(): Array<BasicEvent> {
    return this.props.events
  }
}
