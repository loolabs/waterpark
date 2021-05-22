import { User } from '../../../domain/entities/user'
import { UserEmail } from '../../../domain/value-objects/user-email'
import { UserEntity } from '../../../../../shared/infra/db/entities/user.entity'
import { UserMap } from '../../../mappers/user-map'
import { UserRepo } from '../user-repo'
import { Result } from '../../../../../shared/core/result'
import { DBError, DBErrors } from '../../../../../shared/infra/db/errors/errors'
import { UserPassword } from '../../../domain/value-objects/user-password'

export class MockUserRepo implements UserRepo {
  protected userEntities: Map<string, UserEntity>

  constructor(userEntities: Array<UserEntity> = []) {
    this.userEntities = new Map(userEntities.map((userEntity) => [userEntity.id, userEntity]))
  }

  async exists(userEmail: UserEmail): Promise<Result<boolean, DBErrors>> {
    for (const userEntity of this.userEntities.values()) {
      if (userEntity.email === userEmail.value) return Result.ok(true)
    }
    return Result.err(new DBError.UserNotFoundError(userEmail.value))
  }

  async getUserByUserId(userId: string): Promise<Result<User, DBErrors>> {
    const userEntity = this.userEntities.get(userId)
    if (!userEntity) return Result.err(new DBError.UserNotFoundError(userId))
    return Result.ok(UserMap.toDomain(userEntity))
  }

  async save(user: User): Promise<void> {
    const exists = await this.exists(user.email)
    if (exists) return

    const userEntity = await UserMap.toPersistence(user)
    this.userEntities.set(userEntity.id, userEntity)
  }

  async getUserByUserEmail(userEmail: UserEmail): Promise<Result<User, DBErrors>> {
    for (const userEntity of this.userEntities.values()) {
      if (userEntity.email === userEmail.value) return Result.ok(UserMap.toDomain(userEntity))
    }
    return Result.err(new DBError.UserNotFoundError(userEmail.value))
  }

  async getUserByUserEmailandUserPassword(userEmail: UserEmail, userPassword: UserPassword): Promise<Result<User, DBErrors>> {
    for (const userEntity of this.userEntities.values()) {
      if (userEntity.email === userEmail.value && userEntity.password == userPassword.value) 
      return Result.ok(UserMap.toDomain(userEntity))
    }
    return Result.err(new DBError.UserNotFoundError(userEmail.value))
  }
}
