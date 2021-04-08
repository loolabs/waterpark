import { Result } from '../../../../shared/core/result'
import { AggregateRoot } from '../../../../shared/domain/aggregate-root'
import { UniqueEntityID } from '../../../../shared/domain/unique-entity-id'
import { ClubCreated } from '../events/club-created'
import { ClubId } from '../value-objects/clubId'

interface ClubProps {
  name: string
  description: string
  iconImage: string
  bannerImage: string
  links: {
    facebook?: string
    twitter?: string
    instagram?: string
    website?: string
  }
  tags: Array<string>
  events: Array<BasicEvent>
}

export type BasicEvent = {
  name: string
  startTime: Date
  endTime: Date
  bannerImage: string
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

  get iconImage(): string {
    return this.props.iconImage
  }

  get bannerImage(): string {
    return this.props.bannerImage
  }

  get facebook(): string | undefined {
    return this.props.links.facebook
  }

  get twitter(): string | undefined {
    return this.props.links.twitter
  }

  get instagram(): string | undefined {
    return this.props.links.instagram
  }

  get website(): string | undefined {
    return this.props.links.website
  }

  get tags(): Array<string> {
    return this.props.tags
  }

  get events(): Array<BasicEvent> {
    return this.props.events
  }
}
