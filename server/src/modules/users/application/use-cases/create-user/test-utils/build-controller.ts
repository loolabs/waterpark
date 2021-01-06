import { MikroUserRepo } from '../../../../infra/repos/implementations/mikro-user-repo'
import { CreateUserController } from '../create-user-controller'
import { CreateUserUseCase } from '../create-user-use-case'

export const buildController = (): CreateUserController => {
  const userEntityRepo = undefined
  const fakeMikroUserRepo = new MikroUserRepo(userEntityRepo)
  const createUserUseCase = new CreateUserUseCase(fakeMikroUserRepo)
  const createUserController = new CreateUserController(createUserUseCase)

  return createUserController
}
