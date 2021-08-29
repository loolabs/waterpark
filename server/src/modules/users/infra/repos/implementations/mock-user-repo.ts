import { UniqueEntityID } from '../../../../../shared/domain/unique-entity-id'
import { User } from '../../../domain/entities/user'
import { UserEmail } from '../../../domain/value-objects/user-email'
import { UserRepo } from '../user-repo'

export class MockUserRepo implements UserRepo {
  protected users: Array<User>
  protected usersById: Map<UniqueEntityID, User>
  protected usersByEmail: Map<UserEmail, User>

  constructor(users: Array<User> = []) {
    this.users = users
    this.usersById = new Map(users.map((user) => [user.id, user]))
    this.usersByEmail = new Map(users.map((user) => [user.email, user]))
  }

  async exists(userEmail: UserEmail): Promise<boolean> {
    return this.usersByEmail.has(userEmail)
  }

  async getUserByUserId(userId: string): Promise<User> {
    const user = this.usersById.get(new UniqueEntityID(userId))
    if (user === undefined) throw new Error()
    return user
  }

  async save(user: User): Promise<void> {
    const exists = await this.exists(user.email)
    if (exists) return

    this.users.push(user)
    this.usersById.set(user.id, user)
    this.usersByEmail.set(user.email, user)
  }

  async findAll(): Promise<Array<User>> {
    return this.users
  }
}
