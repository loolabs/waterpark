import { MockUserRepo } from '../../../../infra/repos/implementations/mock-user-repo'
import { CreateUserUseCase } from '../create-user-use-case'
import { CreateUserController } from '../create-user-controller'
import { User } from '../../../../domain/entities/user'
import { UserMap } from '../../../../mappers/user-map'

const setup = async (users: Array<User> = []) => {
  const userRepo = new MockUserRepo(await Promise.all(users.map(UserMap.toPersistence)))
  const createUserUseCase = new CreateUserUseCase(userRepo)
  const createUserController = new CreateUserController(createUserUseCase)

  return { userRepo, createUserUseCase, createUserController }
}

export { setup }
