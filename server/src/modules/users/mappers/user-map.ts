import { UniqueEntityID } from '../../../shared/domain/unique-entity-id'
import { UserEntity } from '../../../shared/infra/db/entities/user.entity'
import { User } from '../domain/entities/user'
import { UserEmail } from '../domain/value-objects/user-email'
import { UserPassword } from '../domain/value-objects/user-password'
import { UserDTO } from './user-dto'

export class UserMap {
  public static toDTO(user: User): UserDTO {
    return {
      email: user.email.value,
      isEmailVerified: user.isEmailVerified,
    }
  }

  public static toDomain(userEntity: UserEntity): User {
    const emailResult = UserEmail.create(userEntity.email)
    const passwordResult = UserPassword.create({
      value: userEntity.password,
      hashed: true,
    })

    if (emailResult.isErr()) throw new Error() // email should be valid since we're pulling value straight from db
    if (passwordResult.isErr()) throw new Error()

    const email = emailResult.value
    const password = passwordResult.value

    const userResult = User.create(
      {
        email,
        password,
        emailVerified: userEntity.emailVerified,
        accessToken: userEntity.accessToken,
        refreshToken: userEntity.refreshToken,
        isDeleted: userEntity.isDeleted,
        lastLogin: userEntity.lastLogin,
      },
      new UniqueEntityID(userEntity.id)
    )
    if (userResult.isErr()) throw new Error() // TODO: check if we should handle error differently

    return userResult.value
  }

  public static async toPersistence(user: User): Promise<UserEntity> {
    const password = user.password.isAlreadyHashed()
      ? user.password.value
      : await user.password.getHashedValue()

    const userEntity = new UserEntity()
    userEntity.email = user.email.value
    userEntity.password = password

    if (user.isEmailVerified !== undefined) userEntity.emailVerified = user.isEmailVerified
    if (user.isDeleted !== undefined) userEntity.isDeleted = user.isDeleted

    userEntity.accessToken = user.accessToken
    userEntity.refreshToken = user.refreshToken
    userEntity.lastLogin = user.lastLogin

    return userEntity
  }
}
