import { UniqueEntityID } from '../../../shared/domain/unique-entity-id'
import { EventEntity } from '../../../shared/infra/db/entities/event.entity'
import { Event } from '../domain/entities/event'
import { EventDTO } from './event-dto'

export class EventMap {
  public static toDTO(event: Event): EventDTO {
    return {
      name: event.name,
      description: event.description,
      links: {
        url: event.url,
        bannerImage: event.bannerImage,
        facebook: event.facebook,
        twitter: event.twitter,
        instagram: event.instagram,
      },
      startTime: event.startTime.toJSON(),
      endTime: event.endTime.toJSON(),
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
        bannerImage: eventEntity.bannerImage,
        startTime: eventEntity.startTime,
        endTime: eventEntity.endTime,
        links: {
          facebook: eventEntity.facebook,
          twitter: eventEntity.twitter,
          instagram: eventEntity.instagram,
        },
        tags: eventEntity.tags.getItems().map((tag) => tag.name),
        clubs: eventEntity.clubs.getItems().map((club) => {
          return { name: club.name, iconImage: club.iconImage }
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
