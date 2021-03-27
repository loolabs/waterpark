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
      bannerURL: eventEntity.bannerURL,
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
      iconURL: club.iconURL,
      bannerURL: club.bannerURL,
      facebookLink: club.facebookLink,
      twitterLink: club.twitterLink,
      instagramLink: club.instagramLink,
      websiteLink: club.websiteLink,
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
        iconURL: clubEntity.iconURL,
        bannerURL: clubEntity.bannerURL,
        facebookLink: clubEntity.facebookLink,
        twitterLink: clubEntity.twitterLink,
        instagramLink: clubEntity.instagramLink,
        websiteLink: clubEntity.websiteLink,
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
