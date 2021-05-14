import { EntityRepository } from '@mikro-orm/core'
import { User } from '../../../domain/entities/user'
import { UserEmail } from '../../../domain/value-objects/user-email'
import { UserEntity } from '../../../../../shared/infra/db/entities/user.entity'
import { UserMap } from '../../../mappers/user-map'
import { UserRepo } from '../user-repo'

export class MikroUserRepo implements UserRepo {
  constructor(protected usersEntityRepo: EntityRepository<UserEntity>) {}

  async exists(userEmail: UserEmail): Promise<boolean> {
    const userEntity = await this.usersEntityRepo.findOne({ email: userEmail.value })
    return userEntity !== null
  }

  async getUserByUserId(userId: string): Promise<User> {
    const userEntity = await this.usersEntityRepo.findOne({ id: userId })
    if (!userEntity) throw new Error() // TODO handle error
    return UserMap.toDomain(userEntity)
  }

  async save(user: User): Promise<void> {
    const exists = await this.exists(user.email)
    if (exists) return

    const userEntity = await UserMap.toPersistence(user)
    this.usersEntityRepo.persist(userEntity)
    this.usersEntityRepo.flush()
  }

  async findAll(): Promise<Array<User>> {
    const userEntities = await this.usersEntityRepo.findAll()
    return userEntities.map((userEntity) => UserMap.toDomain(userEntity))
  }
}
