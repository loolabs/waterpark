import { ProtectedUserController } from './protected-user-controller'
import { ProtectedUserUseCase } from './protected-user-use-case'

const protectedUserUseCase = new ProtectedUserUseCase()
const protectedUserController = new ProtectedUserController(protectedUserUseCase)

export { protectedUserUseCase, protectedUserController }
