import { User } from '../../../domain/entities/user'
import { UserEmail } from '../../../domain/value-objects/user-email'
import { UserEntity } from '../../../../../shared/infra/db/entities/user.entity'
import { UserMap } from '../../../mappers/user-map'
import { UserRepo } from '../user-repo'

export class MockUserRepo implements UserRepo {
  protected userEntities: Map<string, UserEntity>

  constructor(userEntities: Array<UserEntity> = []) {
    this.userEntities = new Map(userEntities.map((userEntity) => [userEntity.id, userEntity]))
  }

  async exists(userEmail: UserEmail): Promise<boolean> {
    for (const userEntity of this.userEntities.values()) {
      if (userEntity.email === userEmail.value) return true
    }
    return false
  }

  async getUserByUserId(userId: string): Promise<User> {
    const userEntity = this.userEntities.get(userId)
    if (!userEntity) throw new Error()
    return UserMap.toDomain(userEntity)
  }

  async save(user: User): Promise<void> {
    const exists = await this.exists(user.email)
    if (exists) return

    const userEntity = await UserMap.toPersistence(user)
    this.userEntities.set(userEntity.id, userEntity)
  }

  // async findAll(): Promise<Array<User>> {
  //   return Array.from(this.userEntities.values()).map(UserMap.toDomain)
  // }
}
