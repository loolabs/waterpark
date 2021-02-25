import { UseCaseWithDTO } from '../../../../../shared/app/use-case-with-dto'
import { AppError } from '../../../../../shared/core/app-error'
import { Result } from '../../../../../shared/core/result'
import { ProtectedUserDTO } from './protected-user-dto'

export type ProtectedUserUseCaseError =
  | AppError.UnexpectedError

export type ProtectedUserSuccess = {
  val: string
}

export type ProtectedUserUseCaseResponse = Result<ProtectedUserSuccess, ProtectedUserUseCaseError>

export class ProtectedUserUseCase
  implements UseCaseWithDTO<ProtectedUserDTO, ProtectedUserUseCaseResponse> {

  async execute(dto: ProtectedUserDTO): Promise<ProtectedUserUseCaseResponse> {
    const res: ProtectedUserSuccess = {
      val: dto.val
    }
    try {
      return Result.ok(res)
    } catch (err) {
      return Result.err(new AppError.UnexpectedError(err))
    }
  }
}
