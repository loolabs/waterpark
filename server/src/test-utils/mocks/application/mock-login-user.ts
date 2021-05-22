import { LoginUserUseCase } from '../../../modules/users/application/use-cases/login-user/login-user-use-case'
import { LoginUserController } from '../../../modules/users/application/use-cases/login-user/login-user-controller'
import { MockUserAuthHandler } from '../../../shared/auth/implementations/mock-user-auth-handler'

const mockLoginUser = async () => {
  const loginUserUseCase = new LoginUserUseCase(new MockUserAuthHandler())
  const loginUserController = new LoginUserController(loginUserUseCase)

  return { loginUserUseCase, loginUserController }
}

export { mockLoginUser }
