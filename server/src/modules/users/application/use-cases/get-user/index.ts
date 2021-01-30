import { mikroUserRepo } from '../../../infra/repos'
import { GetUserUseCase } from './get-user-use-case'

const getUserUseCase = new GetUserUseCase(mikroUserRepo)

export { getUserUseCase }
