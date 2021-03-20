import { Result } from '../../../../shared/core/result'
import { AggregateRoot } from '../../../../shared/domain/aggregate-root'
import { UniqueEntityID } from '../../../../shared/domain/unique-entity-id'
import { EventCreated } from '../events/event-created'
import { EventId } from '../value-objects/eventId'

interface EventProps {
  name: string
  description: string
  url?: string
  startTime: Date
  endTime: Date
  facebookLink?: string
  twitterLink?: string
  instagramLink?: string
  websiteLink?: string
  backgroundImageURL?: string
  tags: Array<string>
  clubs: Array<BasicClub>
}

export type BasicClub = {
  name: string
  iconURL: string
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

  get url(): string | undefined {
    return this.props.url
  }

  get startTime(): Date {
    return this.props.startTime
  }

  get endTime(): Date {
    return this.props.endTime
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

  get backgroundImageURL(): string | undefined {
    return this.props.backgroundImageURL
  }

  get tags(): Array<string> {
    return this.props.tags
  }

  get clubs(): Array<BasicClub> {
    return this.props.clubs
  }
}
