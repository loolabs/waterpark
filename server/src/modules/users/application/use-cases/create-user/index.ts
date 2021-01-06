import { mikroUserRepo } from '../../../infra/repos'
import { CreateUserController } from './create-user-controller'
import { CreateUserUseCase } from './create-user-use-case'

const createUserUseCase = new CreateUserUseCase(mikroUserRepo)
const createUserController = new CreateUserController(createUserUseCase)

export { createUserUseCase, createUserController }
