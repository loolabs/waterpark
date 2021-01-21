import { mikroUserRepo } from '../../../infra/repos'
import { LoginUserController } from './login-user-controller'
import { LoginUserUseCase } from './login-user-use-case'

const loginUserUseCase = new LoginUserUseCase(mikroUserRepo)
const loginUserController = new LoginUserController(loginUserUseCase)

export { loginUserUseCase, loginUserController }
