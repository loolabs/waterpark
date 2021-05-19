import { EntityRepository } from '@mikro-orm/core'
import { Result } from '../../../../../shared/core/result'
import { UserEntity } from '../../../../../shared/infra/db/entities/user.entity'
import { DBError, DBErrors } from '../../../../../shared/infra/db/errors/errors'
import { User } from '../../../domain/entities/user'
import { UserEmail } from '../../../domain/value-objects/user-email'
import { UserPassword } from '../../../domain/value-objects/user-password'
import { UserMap } from '../../../mappers/user-map'
import { UserRepo } from '../user-repo'

export class MikroUserRepo implements UserRepo {
  constructor(protected usersEntityRepo: EntityRepository<UserEntity>) {}

  async exists(userEmail: UserEmail): Promise<Result<boolean, DBErrors>> {
    const user = await this.usersEntityRepo.findOne({ email: userEmail.value })
    if(user !== null){
      return Result.ok(user !== null)
    } else {
      return Result.err(new DBError.UserNotFoundError(userEmail.value))
    }
  }

  async getUserByUserId(userId: string): Promise<Result<User, DBErrors>> {
    const user = await this.usersEntityRepo.findOne({ id: userId })
    if (user === null) return Result.err(new DBError.UserNotFoundError(userId))
    return Result.ok(UserMap.toDomain(user))
  }

  async getUserByUserEmail(userEmail: UserEmail): Promise<Result<User, DBErrors>> {
    const user = await this.usersEntityRepo.findOne({ email: userEmail.value })
    if (user === null) return Result.err(new DBError.UserNotFoundError(userEmail.value))
    return Result.ok(UserMap.toDomain(user))
  }

  async getUserByUserEmailandUserPassword(userEmail: UserEmail, userPassword: UserPassword): Promise<Result<User, DBErrors>> {
    const user = await this.usersEntityRepo.findOne({ email: userEmail.value })
    if (user === null) return Result.err(new DBError.UserNotFoundError(userEmail.value))
        
    const passwordsEqual = await userPassword.comparePassword(user.password)
    if(passwordsEqual.isOk() && !passwordsEqual.value){
      return Result.err(new DBError.PasswordsNotEqualError(userEmail.value))
    }
    return Result.ok(UserMap.toDomain(user))
  }

  async save(user: User): Promise<void> {
   
    const exists = await this.exists(user.email)

    if (exists.isOk() && exists.value) return

    const userEntity = await UserMap.toPersistence(user)
    this.usersEntityRepo.persist(userEntity)
    this.usersEntityRepo.flush()
  }

  async findAll(): Promise<Result<Array<User>, DBErrors>> {
    const users = await this.usersEntityRepo.findAll()
    return Result.ok(users.map((user) => UserMap.toDomain(user)))
  }
}
