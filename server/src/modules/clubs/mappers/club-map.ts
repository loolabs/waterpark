import { UniqueEntityID } from '../../../shared/domain/unique-entity-id'
import { ClubEntity } from '../../../shared/infra/db/entities/club.entity'
import { Club } from '../domain/entities/club'
import { ClubDTO } from './club-dto'

export class ClubMap {
  public static toDTO(club: Club): ClubDTO { 
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

    return clubEntity
  }
}
