import { UniqueEntityID } from '../../../shared/domain/unique-entity-id'
import { EventEntity } from '../../../shared/infra/db/entities/event.entity'
import { Event } from '../domain/entities/event'
import { EventDTO } from './event-dto'

export class EventMap {
  public static toDTO(event: Event): EventDTO {
    return {
      name: event.name,
      description: event.description,
    }
  }

  public static toDomain(eventEntity: EventEntity): Event {
    const eventResult = Event.create(
      {
        name: eventEntity.name,
        description: eventEntity.description,
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
