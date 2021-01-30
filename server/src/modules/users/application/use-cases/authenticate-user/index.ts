import { mikroUserRepo } from '../../../infra/repos'
import { AuthenticateUserUseCase } from './authenticate-user-use-case'

const authenticateUserUseCase = new AuthenticateUserUseCase(mikroUserRepo)

export { authenticateUserUseCase }
