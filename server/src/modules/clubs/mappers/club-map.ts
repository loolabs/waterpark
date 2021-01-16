import { UniqueEntityID } from '../../../shared/domain/unique-entity-id'
import { ClubEntity } from '../../../shared/infra/db/entities/club.entity'
import { Club } from '../domain/entities/club'
import { ClubDTO } from './club-dto'

export class ClubMap {
  public static toDTO(club: Club): ClubDTO { //TODO: verify use of toDTO and adapt to clubs
    return {
      name: club.name,
    }
  }

  public static toDomain(clubEntity: ClubEntity): Club {
    const clubResult = Club.create(
      {
        name: clubEntity.name,
        description: clubEntity.description,
        // accessToken: clubEntity.accessToken,
        // refreshToken: clubEntity.refreshToken,
        isDeleted: clubEntity.isDeleted,
        // lastLogin: clubEntity.lastLogin,
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

    // clubEntity.accessToken = club.accessToken
    // clubEntity.refreshToken = club.refreshToken
    // clubEntity.lastLogin = club.lastLogin

    return clubEntity
  }
}
