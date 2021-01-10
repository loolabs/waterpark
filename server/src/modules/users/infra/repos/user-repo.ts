import { User } from '../../domain/entities/user'
import { UserEmail } from '../../domain/value-objects/user-email'

export abstract class UserRepo {
  abstract exists(userEmail: UserEmail): Promise<boolean>
  abstract getUserByUserId(userId: string): Promise<User>
  abstract save(user: User): Promise<void>
}
