import { UseCase } from '../../../../../shared/app/use-case'
import { AppError } from '../../../../../shared/core/app-error'
import { Result } from '../../../../../shared/core/result'
import { User } from '../../../domain/entities/user'
import { UserRepo } from '../../../infra/repos/user-repo'
import { LoginUserDTO } from './login-user-dto'
import { LoginUserErrors } from './login-user-errors'

type LoginUserUseCaseError =
  | LoginUserErrors.IncorrectPasswordError
  | AppError.UnexpectedError

type LoginUserUseCaseResponse = Result<User, LoginUserUseCaseError>

export class LoginUserUseCase
  implements UseCase<LoginUserDTO, Promise<LoginUserUseCaseResponse>> {
  // private userRepo: UserRepo

  // constructor(userRepo: UserRepo) {
  constructor(_: UserRepo) {
    // this.userRepo = userRepo
  }

  // async execute(request: LoginUserDTO): Promise<LoginUserUseCaseResponse> {
  async execute(_: LoginUserDTO): Promise<LoginUserUseCaseResponse> {
    try {
      return Result.err(new LoginUserErrors.IncorrectPasswordError())
    } catch (err) {
      return Result.err(new AppError.UnexpectedError(err))
    }
  }
}
