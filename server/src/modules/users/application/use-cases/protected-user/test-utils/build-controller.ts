import { ProtectedUserController } from '../protected-user-controller'
import { ProtectedUserUseCase } from '../protected-user-use-case'

export const buildController = (): ProtectedUserController => {
  const protectedUserUseCase = new ProtectedUserUseCase()
  const protectedUserController = new ProtectedUserController(protectedUserUseCase)

  return protectedUserController
}
