import { UniqueEntityID } from '../../../shared/domain/unique-entity-id'
import { EventEntity } from '../../../shared/infra/db/entities/event.entity'
import { Event } from '../domain/entities/event'
import { EventDTO } from './event-dto'

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
      bannerURL: event.bannerURL,
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
        bannerURL: eventEntity.bannerURL,
        tags: eventEntity.tags.getItems().map((tag) => tag.name),
        clubs: eventEntity.clubs.getItems().map((club) => {
          return { name: club.name, iconURL: club.iconURL }
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
