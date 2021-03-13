import { Result } from '../../../../shared/core/result'
import { AggregateRoot } from '../../../../shared/domain/aggregate-root'
import { UniqueEntityID } from '../../../../shared/domain/unique-entity-id'
import { EventCreated } from '../events/event-created'
import { EventId } from '../value-objects/eventId'

interface EventProps {
  name: string
  description: string
  url: string | null
  startTime: Date
  endTime: Date
  facebookLink: string | null
  twitterLink: string | null
  instagramLink: string | null
  websiteLink: string | null
  backgroundImageURL: string | null
  tags: Array<string>
  clubs: Array<BasicClub>
}

export type BasicClub = {
  name: string
  iconURL: string | null
}

export class Event extends AggregateRoot<EventProps> {
  public static create(props: EventProps, id?: UniqueEntityID): Result<Event, Error> {
    const isNewEvent = id === undefined
    const event = new Event(
      {
        ...props,
      },
      id
    )

    if (isNewEvent) event.addDomainEvent(new EventCreated(event))

    return Result.ok(event)
  }

  private constructor(props: EventProps, id?: UniqueEntityID) {
    super(props, id)
  }

  get eventId(): EventId {
    const eventIdResult = EventId.create(this._id)
    if (eventIdResult.isOk()) return eventIdResult.value
    else throw new Error('Could not create EventId instance')
  }

  get name(): string {
    return this.props.name
  }

  get description(): string {
    return this.props.description
  }

  get url(): string | null {
    return this.props.url
  }

  get startTime(): Date {
    return this.props.startTime
  }

  get endTime(): Date {
    return this.props.endTime
  }

  get facebookLink(): string | null {
    return this.props.facebookLink
  }

  get twitterLink(): string | null {
    return this.props.twitterLink
  }

  get instagramLink(): string | null {
    return this.props.instagramLink
  }

  get websiteLink(): string | null {
    return this.props.websiteLink
  }

  get backgroundImageURL(): string | null {
    return this.props.backgroundImageURL
  }

  get tags(): Array<string> {
    return this.props.tags
  }

  get clubs(): Array<BasicClub> {
    return this.props.clubs
  }
}
