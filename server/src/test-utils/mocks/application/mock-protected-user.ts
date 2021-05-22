import { ProtectedUserUseCase } from '../../../modules/users/application/use-cases/protected-user/protected-user-use-case'
import { ProtectedUserController } from '../../../modules/users/application/use-cases/protected-user/protected-user-controller'

const mockProtectedUser = async () => {
  const protectedUserUseCase = new ProtectedUserUseCase()
  const protectedUserController = new ProtectedUserController(protectedUserUseCase)

  return { protectedUserUseCase, protectedUserController }
}

export { mockProtectedUser }
