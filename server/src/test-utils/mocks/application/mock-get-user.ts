import { MockUserRepo } from '../../../modules/users/infra/repos/implementations/mock-user-repo'
import { User } from '../../../modules/users/domain/entities/user'
import { UserMap } from '../../../modules/users/mappers/user-map'
import { GetUserUseCase } from '../../../modules/users/application/use-cases/get-user/get-user-use-case'

const mockGetUser = async (users: Array<User> = []) => {
  const userRepo = new MockUserRepo(await Promise.all(users.map(UserMap.toPersistence)))
  const getUserUseCase = new GetUserUseCase(userRepo)

  return { userRepo, getUserUseCase }
}

export { mockGetUser }
