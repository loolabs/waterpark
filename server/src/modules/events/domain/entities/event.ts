import { UniqueEntityID } from './../../../../shared/domain/unique-entity-id'
import { Result } from '../../../../shared/core/result'
import { AggregateRoot } from '../../../../shared/domain/aggregate-root'
import { EventCreated } from '../events/event-created'

interface EventProps {
  name: string
  description: string
  startTime: Date
  endTime: Date
  links: {
    url?: string
    bannerImage: string
    facebook?: string
    twitter?: string
    instagram?: string
  }
  tags: Array<string>
  clubs: Array<BasicClub>
}

export type BasicClub = {
  id: UniqueEntityID
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

  get name(): string {
    return this.props.name
  }

  get description(): string {
    return this.props.description
  }

  get startTime(): Date {
    return this.props.startTime
  }

  get endTime(): Date {
    return this.props.endTime
  }

  get url(): string | undefined {
    return this.props.links.url
  }

  get bannerImage(): string {
    return this.props.links.bannerImage
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
