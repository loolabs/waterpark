import { UniqueEntityID } from '../../../shared/domain/unique-entity-id'
import { ClubEntity } from '../../../shared/infra/db/entities/club.entity'
import { EventEntity } from '../../../shared/infra/db/entities/event.entity'
import { BasicEvent, Club } from '../domain/entities/club'
import { ClubDTO } from './club-dto'

const basicEventsToDomain = (eventEntities: Array<EventEntity>): Array<BasicEvent> =>
  eventEntities.map((eventEntity) => {
    return {
      id: new UniqueEntityID(eventEntity.id),
      name: eventEntity.name,
      startTime: eventEntity.startTime,
      endTime: eventEntity.endTime,
      bannerImage: eventEntity.bannerImage,
      tags: eventEntity.tags.getItems().map((tag) => tag.name),
    }
  })

export class ClubMap {
  public static toDTO(club: Club): ClubDTO {
    return {
      ...club.props,
      id: club.id.toString(),
      events: club.events.map((event) => {
        return {
          ...event,
          id: event.id.toString(),
          startTime: event.startTime.toJSON(),
          endTime: event.endTime.toJSON(),
        }
      }),
    }
  }

  public static toDomain(clubEntity: ClubEntity): Club {
    const clubResult = Club.create(
      {
        name: clubEntity.name,
        description: clubEntity.description,
        size: clubEntity.size,
        links: {
          iconImage: clubEntity.iconImage,
          bannerImage: clubEntity.bannerImage,
          facebook: clubEntity.facebook,
          twitter: clubEntity.twitter,
          instagram: clubEntity.instagram,
          website: clubEntity.website,
        },
        tags: clubEntity.tags.getItems().map((tag) => tag.name),
        events: basicEventToDomain(clubEntity.events.getItems()),
      },
      new UniqueEntityID(clubEntity.id)
    )
    if (clubResult.isErr()) throw new Error() // TODO: error handling

    return clubResult.value
  }

  public static async toPersistence(club: Club): Promise<ClubEntity> {
    const clubEntity = new ClubEntity()
    clubEntity.name = club.name
    clubEntity.description = club.description

    return clubEntity
  }
}
