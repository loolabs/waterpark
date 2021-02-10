import { UserAuthHandler } from '../../../../../../shared/auth/user-auth-handler'
import { LoginUserController } from '../login-user-controller'
import { LoginUserUseCase } from '../login-user-use-case'

export const buildController = (): LoginUserController => {
  const userAuthHandler = new UserAuthHandler()
  const loginUserUseCase = new LoginUserUseCase(userAuthHandler)
  const loginUserController = new LoginUserController(loginUserUseCase)

  return loginUserController
}
