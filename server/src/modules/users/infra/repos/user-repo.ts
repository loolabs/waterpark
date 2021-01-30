import { Result } from '../../../../shared/core/result'
import { RepoError } from '../../../../shared/infra/db/errors/errors'
import { User } from '../../domain/entities/user'
import { UserEmail } from '../../domain/value-objects/user-email'
import { UserPassword } from '../../domain/value-objects/user-password'

export abstract class UserRepo {
  abstract exists(userEmail: UserEmail): Promise<boolean>
  abstract getUserByUserId(userId: string): Promise<Result<User, RepoError>>
  abstract getUserByUserEmailandUserPassword(userEmail: UserEmail, password: UserPassword): Promise<Result<User, RepoError>>
  abstract save(user: User): Promise<void>
}
