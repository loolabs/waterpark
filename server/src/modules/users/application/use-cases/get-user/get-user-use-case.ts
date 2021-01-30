import { UseCase } from '../../../../../shared/app/use-case'
import { AppError } from '../../../../../shared/core/app-error'
import { Result } from '../../../../../shared/core/result'
import { User } from '../../../domain/entities/user'
import { UserRepo } from '../../../infra/repos/user-repo'
import { GetUserDTO } from './get-user-dto'
import { GetUserErrors } from './get-user-errors'

type GetUserUseCaseError =
    GetUserErrors.GetUserByIdFailedError
  | AppError.UnexpectedError

type GetUserUseCaseResponse = Result<User, GetUserUseCaseError>

export class GetUserUseCase
  implements UseCase<GetUserDTO, Promise<GetUserUseCaseResponse>> {
  private userRepo: UserRepo

  constructor(userRepo: UserRepo) {
    this.userRepo = userRepo
  }

  async execute(request: GetUserDTO): Promise<GetUserUseCaseResponse> {
    const userId = request.id
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
