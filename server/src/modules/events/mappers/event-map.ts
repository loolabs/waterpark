import { UniqueEntityID } from '../../../shared/domain/unique-entity-id'
import { EventEntity } from '../../../shared/infra/db/entities/event.entity'
import { Event } from '../domain/entities/event'
import { BasicClub } from '../domain/entities/event'

export interface EventDTO {
  name: string
  description: string
  url?: string
  startTime: string
  endTime: string
  facebookLink?: string
  twitterLink?: string
  instagramLink?: string
  websiteLink?: string
  backgroundImageURL?: string
  tags: Array<string>
  clubs: Array<BasicClub>
}

export class EventMap {
  public static toDTO(event: Event): EventDTO {
    return {
      name: event.name,
      description: event.description,
      url: event.url,
      startTime: event.startTime.toJSON(),
      endTime: event.endTime.toJSON(),
      facebookLink: event.facebookLink,
      twitterLink: event.twitterLink,
      instagramLink: event.instagramLink,
      websiteLink: event.websiteLink,
      backgroundImageURL: event.backgroundImageURL,
      tags: event.tags,
      clubs: event.clubs,
    }
  }

  public static toDomain(eventEntity: EventEntity): Event {
    const eventResult = Event.create(
      {
        name: eventEntity.name,
        description: eventEntity.description,
        url: eventEntity.url,
        startTime: eventEntity.startTime,
        endTime: eventEntity.endTime,
        facebookLink: eventEntity.facebookLink,
        twitterLink: eventEntity.twitterLink,
        instagramLink: eventEntity.instagramLink,
        websiteLink: eventEntity.websiteLink,
        backgroundImageURL: eventEntity.backgroundImageURL,
        tags: eventEntity.tags.getItems().map((tag) => tag.name),
        clubs: eventEntity.clubs.getItems().map((club) => {
          return { name: club.name, iconURL: club.iconURL } as BasicClub
        }),
      },
      new UniqueEntityID(eventEntity.id)
    )
    if (eventResult.isErr()) throw new Error() // TODO: error handling

    return eventResult.value
  }

  public static async toPersistence(event: Event): Promise<EventEntity> {
    const eventEntity = new EventEntity()
    eventEntity.name = event.name
    eventEntity.description = event.description

    return eventEntity
  }
}
