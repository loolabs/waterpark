import { MikroUserRepo } from '../../../../infra/repos/implementations/mikro-user-repo'
import { LoginUserController } from '../login-user-controller'
import { LoginUserUseCase } from '../login-user-use-case'

export const buildController = (): LoginUserController => {
  const userEntityRepo = undefined
  const fakeMikroUserRepo = new MikroUserRepo(userEntityRepo)
  const loginUserUseCase = new LoginUserUseCase(fakeMikroUserRepo)
  const loginUserController = new LoginUserController(loginUserUseCase)

  return loginUserController
}
