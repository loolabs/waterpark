import { UniqueEntityID } from '../../../shared/domain/unique-entity-id'
import { ClubEntity } from '../../../shared/infra/db/entities/club.entity'
import { EventEntity } from '../../../shared/infra/db/entities/event.entity'
import { BasicEvent, Club } from '../domain/entities/club'
import { ClubDTO } from './club-dto'

const basicEventMap = (eventEntities: Array<EventEntity>): Array<BasicEvent> => {
  const events = eventEntities.map((eventEntity) => {
    return {
      name: eventEntity.name,
      startTime: eventEntity.startTime,
      endTime: eventEntity.endTime,
      bannerImage: eventEntity.bannerImage,
      tags: eventEntity.tags.getItems().map((tag) => tag.name),
    }
  })
  return events
}

export class ClubMap {
  public static toDTO(club: Club): ClubDTO {
    return {
      name: club.name,
      description: club.description,
      links: {
        bannerImage: club.bannerImage,
        iconImage: club.iconImage,
        facebook: club.facebook,
        twitter: club.twitter,
        instagram: club.instagram,
        website: club.website,
      },
      tags: club.tags,
      events: club.events.map((event) => {
        return {
          ...event,
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
        iconImage: clubEntity.iconImage,
        bannerImage: clubEntity.bannerImage,
        links: {
          facebook: clubEntity.facebook,
          twitter: clubEntity.twitter,
          instagram: clubEntity.instagram,
          website: clubEntity.website,
        },
        tags: clubEntity.tags.getItems().map((tag) => tag.name),
        events: basicEventMap(clubEntity.events.getItems()),
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
