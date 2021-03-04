import { EntityRepository } from '@mikro-orm/core'
import { DB } from '../../../../../shared/infra/db'
import { UserEntity } from '../../../../../shared/infra/db/entities/user.entity'
import { User } from '../../../domain/entities/user'
import { UserEmail } from '../../../domain/value-objects/user-email'
import { UserMap } from '../../../mappers/user-map'
import { UserRepo } from '../user-repo'

export class MikroUserRepo implements UserRepo {
  // TODO: when this class is instantiated, the entityrepo from mikroorm is undefined bc its loaded asynchronously

  // right now we are directly importing the DB via module which is bad bc it couples this repo to the mikroentityrepo which is not good bc of testing. ideally we would pass this repo an entityrepostub

  // look into async imports with JS (one option i tried exploring is inverisfy, that shit is confusing though with async modules)
  constructor(protected userRepo: EntityRepository<UserEntity> | undefined) {}

  async exists(userEmail: UserEmail): Promise<boolean> {
    const user = await DB.usersEntityRepo.findOne({ email: userEmail.value })
    return user !== null
  }

  async getUserByUserId(userId: string): Promise<User> {
    const user = await DB.usersEntityRepo.findOne({ id: userId })
    if (!user) throw new Error() // TODO handle error
    return UserMap.toDomain(user)
  }

  async save(user: User): Promise<void> {
    console.log(this.usersEntityRepo)
    const exists = await this.exists(user.email)

    if (exists) return

    const userEntity = await UserMap.toPersistence(user)

    DB.usersEntityRepo.persist(userEntity)
    DB.usersEntityRepo.flush()
  }

  async findAll(): Promise<Array<User>> {
    const users = await DB.usersEntityRepo.findAll()
    return users.map((user) => UserMap.toDomain(user))
  }
}
