import { UseCaseWithDTO } from '../../../../../shared/app/use-case-with-dto'
import { AppError } from '../../../../../shared/core/app-error'
import { Result } from '../../../../../shared/core/result'
import { User } from '../../../domain/entities/user'
import { UserEmail } from '../../../domain/value-objects/user-email'
import { UserPassword } from '../../../domain/value-objects/user-password'
import { UserRepo } from '../../../infra/repos/user-repo'
import { AuthenticateUserDTO } from './authenticate-user-dto'
import { AuthenticateUserErrors } from './authenticate-user-errors'

type AuthenticateUserUseCaseError =
    AuthenticateUserErrors.AuthenticationFailedError
  | AppError.UnexpectedError

export type AuthenticateUserUseCaseResponse = Result<User, AuthenticateUserUseCaseError>

export class AuthenticateUserUseCase
  implements UseCaseWithDTO<AuthenticateUserDTO, AuthenticateUserUseCaseResponse> {
  private userRepo: UserRepo

  constructor(userRepo: UserRepo) {
    this.userRepo = userRepo
  }

  async execute(dto: AuthenticateUserDTO): Promise<AuthenticateUserUseCaseResponse> {
    const emailResult = UserEmail.create(dto.email)
    const passwordResult = UserPassword.create({
      value: dto.password,
      hashed: false,
    })

    const results = [emailResult, passwordResult] as const
    if (!Result.resultsAllOk(results)) {
      return Result.err(Result.getFirstError([emailResult, passwordResult]).error)
    }

    const email = results[0].value
    const password = results[1].value

    try {
      const userByEmailAndPassword = await this.userRepo.getUserByUserEmailandUserPassword(email, password)
      if (userByEmailAndPassword.isErr())
        return Result.err(new AuthenticateUserErrors.AuthenticationFailedError(email.value, userByEmailAndPassword.error.message))

      return Result.ok(userByEmailAndPassword.value)
    } catch (err) {
      return Result.err(new AppError.UnexpectedError(err))
    }
  }
}
