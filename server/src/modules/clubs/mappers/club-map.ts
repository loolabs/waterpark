import { UniqueEntityID } from '../../../shared/domain/unique-entity-id'
import { ClubEntity } from '../../../shared/infra/db/entities/club.entity'
import { Club } from '../domain/entities/club'
import { ClubEmail } from '../domain/value-objects/club-email'
import { ClubPassword } from '../domain/value-objects/club-password'
import { ClubDTO } from './club-dto'

export class ClubMap {
  public static toDTO(club: Club): ClubDTO { //TODO: verify use of toDTO and adapt to clubs
    return {
      email: club.email.value,
      isEmailVerified: club.isEmailVerified,
    }
  }

  public static toDomain(clubEntity: ClubEntity): Club {
    const emailResult = ClubEmail.create(clubEntity.email)
    const passwordResult = ClubPassword.create({
      value: clubEntity.password,
      hashed: true,
    })

    if (emailResult.isErr()) throw new Error() // email should be valid since we're pulling value straight from db
    if (passwordResult.isErr()) throw new Error()

    const email = emailResult.value
    const password = passwordResult.value

    const clubResult = Club.create(
      {
        email,
        password,
        name: clubEntity.name,
        description: clubEntity.description,
        emailVerified: clubEntity.emailVerified,
        accessToken: clubEntity.accessToken,
        refreshToken: clubEntity.refreshToken,
        isDeleted: clubEntity.isDeleted,
        lastLogin: clubEntity.lastLogin,
      },
      new UniqueEntityID(clubEntity.id)
    )
    if (clubResult.isErr()) throw new Error() // TODO: check if we should handle error differently

    return clubResult.value
  }

  public static async toPersistence(club: Club): Promise<ClubEntity> {
    const password = club.password.isAlreadyHashed()
      ? club.password.value
      : await club.password.getHashedValue()

    const clubEntity = new ClubEntity()
    clubEntity.email = club.email.value
    clubEntity.password = password
    clubEntity.name = club.name
    clubEntity.description=club.description
    if (club.isEmailVerified !== undefined) clubEntity.emailVerified = club.isEmailVerified
    if (club.isDeleted !== undefined) clubEntity.isDeleted = club.isDeleted

    clubEntity.accessToken = club.accessToken
    clubEntity.refreshToken = club.refreshToken
    clubEntity.lastLogin = club.lastLogin

    return clubEntity
  }
}
