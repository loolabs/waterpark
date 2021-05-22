import { UseCaseWithDTO } from '../../../../../shared/app/use-case-with-dto'
import { AppError } from '../../../../../shared/core/app-error'
import { Result } from '../../../../../shared/core/result'
import { User } from '../../../domain/entities/user'
import { UserRepo } from '../../../infra/repos/user-repo'
import { GetUserDTO } from './get-user-dto'
import { GetUserErrors } from './get-user-errors'

export type GetUserUseCaseError =
    GetUserErrors.GetUserByIdFailedError
  | AppError.UnexpectedError

export type GetUserUseCaseResponse = Result<User, GetUserUseCaseError>

export class GetUserUseCase
  implements UseCaseWithDTO<GetUserDTO, GetUserUseCaseResponse> {
  private userRepo: UserRepo

  constructor(userRepo: UserRepo) {
    this.userRepo = userRepo
  }

  async execute(dto: GetUserDTO): Promise<GetUserUseCaseResponse> {
    const userId = dto.userId
    try {
      const userById = await this.userRepo.getUserByUserId(userId)
      if (userById.isErr())
        return Result.err(new GetUserErrors.GetUserByIdFailedError(userId))

      return Result.ok(userById.value)
    } catch (err) {
      return Result.err(new AppError.UnexpectedError(err))
    }
  }
}
