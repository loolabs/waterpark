import { Result } from '../../../../shared/core/result'
import { AggregateRoot } from '../../../../shared/domain/aggregate-root'
import { UniqueEntityID } from '../../../../shared/domain/unique-entity-id'
import { EventCreated } from '../events/event-created'
import { EventId } from '../value-objects/eventId'

interface EventProps {
  name: string
  description: string
  url?: string
  bannerImage: string
  startTime: Date
  endTime: Date
  links: {
    facebook?: string
    twitter?: string
    instagram?: string
  }
  tags: Array<string>
  clubs: Array<BasicClub>
}

export type BasicClub = {
  name: string
  iconImage: string
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

  get bannerImage(): string {
    return this.props.bannerImage
  }

  get startTime(): Date {
    return this.props.startTime
  }

  get endTime(): Date {
    return this.props.endTime
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

  get tags(): Array<string> {
    return this.props.tags
  }

  get clubs(): Array<BasicClub> {
    return this.props.clubs
  }
}
