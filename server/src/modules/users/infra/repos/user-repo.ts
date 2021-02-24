import { Result } from '../../../../shared/core/result'
import { DBErrors } from '../../../../shared/infra/db/errors/errors'
import { User } from '../../domain/entities/user'
import { UserEmail } from '../../domain/value-objects/user-email'
import { UserPassword } from '../../domain/value-objects/user-password'

export abstract class UserRepo {
  abstract exists(userEmail: UserEmail): Promise<Result<boolean, DBErrors>>
  abstract getUserByUserId(userId: string): Promise<Result<User, DBErrors>>
  abstract getUserByUserEmail(userEmail: UserEmail): Promise<Result<User, DBErrors>>
  abstract getUserByUserEmailandUserPassword(userEmail: UserEmail, password: UserPassword): Promise<Result<User, DBErrors>>
  abstract save(user: User): Promise<void>
}
