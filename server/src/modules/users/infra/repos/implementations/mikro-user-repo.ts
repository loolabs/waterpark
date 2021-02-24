import { EntityRepository } from '@mikro-orm/core'
import { Result } from '../../../../../shared/core/result'
import { DB } from '../../../../../shared/infra/db'
import { UserEntity } from '../../../../../shared/infra/db/entities/user.entity'
import { DBError, DBErrors } from '../../../../../shared/infra/db/errors/errors'
import { User } from '../../../domain/entities/user'
import { UserEmail } from '../../../domain/value-objects/user-email'
import { UserPassword } from '../../../domain/value-objects/user-password'
import { UserMap } from '../../../mappers/user-map'
import { UserRepo } from '../user-repo'

export class MikroUserRepo implements UserRepo {
  // TODO: when this class is instantiated, the entityrepo from mikroorm is undefined bc its loaded asynchronously

  // right now we are directly importing the DB via module which is bad bc it couples this repo to the mikroentityrepo which is not good bc of testing. ideally we would pass this repo an entityrepostub

  // look into async imports with JS (one option i tried exploring is inverisfy, that shit is confusing though with async modules)
  constructor(_userRepo: EntityRepository<UserEntity> | undefined) {
    
  }

  async exists(userEmail: UserEmail): Promise<Result<boolean, DBErrors>> {
    const user = await DB.usersEntityRepo.findOne({ email: userEmail.value })
    return Result.ok(user !== null)
  }

  async getUserByUserId(userId: string): Promise<Result<User, DBErrors>> {
    const user = await DB.usersEntityRepo.findOne({ id: userId })
    if (user === null) return Result.err(new DBError.UserNotFoundError(userId))
    return Result.ok(UserMap.toDomain(user))
  }

  async getUserByUserEmail(userEmail: UserEmail): Promise<Result<User, DBErrors>> {
    const user = await DB.usersEntityRepo.findOne({ email: userEmail.value })
    if (user === null) return Result.err(new DBError.UserNotFoundError(userEmail.value))
    return Result.ok(UserMap.toDomain(user))
  }

  async getUserByUserEmailandUserPassword(userEmail: UserEmail, userPassword: UserPassword): Promise<Result<User, DBErrors>> {
    const user = await DB.usersEntityRepo.findOne({ email: userEmail.value })
    if (user === null || !userPassword.comparePassword(user.password)) return Result.err(new DBError.UserNotFoundError(userEmail.value))
    return Result.ok(UserMap.toDomain(user))
  }

  async save(user: User): Promise<void> {
   
    const exists = await this.exists(user.email)

    if (exists.isOk() && exists.value) return

    const userEntity = await UserMap.toPersistence(user)

    DB.usersEntityRepo.persist(userEntity)
    DB.usersEntityRepo.flush()
  }

  async findAll(): Promise<Result<Array<User>, DBErrors>> {
    const users = await DB.usersEntityRepo.findAll()
    return Result.ok(users.map((user) => UserMap.toDomain(user)))
  }
}
