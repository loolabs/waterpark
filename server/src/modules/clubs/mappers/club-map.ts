import { UniqueEntityID } from '../../../shared/domain/unique-entity-id'
import { ClubEntity } from '../../../shared/infra/db/entities/club.entity'
import { Club } from '../domain/entities/club'
import { ClubDTO } from './club-dto'

export class ClubMap {
  public static toDTO(club: Club): ClubDTO { //TODO: verify use of toDTO and adapt to clubs
    return {
      name: club.name,
      description: club.description
    }
  }

  public static toDomain(clubEntity: ClubEntity): Club {
    const clubResult = Club.create(
      {
        name: clubEntity.name,
        description: clubEntity.description,
        isDeleted: clubEntity.isDeleted,
      },
      new UniqueEntityID(clubEntity.id)
    )
    if (clubResult.isErr()) throw new Error() // TODO: error handling

    return clubResult.value
  }

  public static async toPersistence(club: Club): Promise<ClubEntity> {
    const clubEntity = new ClubEntity()
    clubEntity.name = club.name
    clubEntity.description=club.description
    if (club.isDeleted !== undefined) clubEntity.isDeleted = club.isDeleted

    return clubEntity
  }
}
