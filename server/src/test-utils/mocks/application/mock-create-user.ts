import { MockUserRepo } from '../../../modules/users/infra/repos/implementations/mock-user-repo'
import { CreateUserUseCase } from '../../../modules/users/application/use-cases/create-user/create-user-use-case'
import { CreateUserController } from '../../../modules/users/application/use-cases/create-user/create-user-controller'
import { User } from '../../../modules/users/domain/entities/user'

export function mockCreateUser(users: Array<User> = []) {
  const userRepo = new MockUserRepo(users)
  const createUserUseCase = new CreateUserUseCase(userRepo)
  const createUserController = new CreateUserController(createUserUseCase)

  return { userRepo, createUserUseCase, createUserController }
}
