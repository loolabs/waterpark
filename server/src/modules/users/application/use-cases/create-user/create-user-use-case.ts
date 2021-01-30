import { UseCase } from '../../../../../shared/app/use-case'
import { UserAuthHandler } from '../../../../../shared/auth/user-auth-handler'
import { AppError } from '../../../../../shared/core/app-error'
import { Result } from '../../../../../shared/core/result'
import { User } from '../../../domain/entities/user'
import { UserValueObjectErrors } from '../../../domain/value-objects/errors'
import { UserEmail } from '../../../domain/value-objects/user-email'
import { UserPassword } from '../../../domain/value-objects/user-password'
import { UserRepo } from '../../../infra/repos/user-repo'
import { CreateUserDTO } from './create-user-dto'
import { CreateUserErrors } from './create-user-errors'

type CreateUserUseCaseError =
  | UserValueObjectErrors.InvalidEmail
  | UserValueObjectErrors.InvalidPassword
  | CreateUserErrors.EmailAlreadyExistsError
  | AppError.UnexpectedError

type CreateUserSuccess = {
  user: User,
  token: string
}

type CreateUserUseCaseResponse = Result<CreateUserSuccess, CreateUserUseCaseError>

export class CreateUserUseCase
  implements UseCase<CreateUserDTO, Promise<CreateUserUseCaseResponse>> {
  private userRepo: UserRepo

  constructor(userRepo: UserRepo) {
    this.userRepo = userRepo
  }

  async execute(request: CreateUserDTO): Promise<CreateUserUseCaseResponse> {
    const emailResult = UserEmail.create(request.email)
    const passwordResult = UserPassword.create({
      value: request.password,
      hashed: false,
    })

    const results = [emailResult, passwordResult] as const
    if (!Result.resultsAllOk(results)) {
      return Result.err(Result.getFirstError([emailResult, passwordResult]).error)
    }

    const email = results[0].value
    const password = results[1].value

    try {
      const userAlreadyExists = await this.userRepo.exists(email)
      if (userAlreadyExists)
        return Result.err(new CreateUserErrors.EmailAlreadyExistsError(email.value))

      const userResult = User.create({
        email,
        password,
      })
      if (userResult.isErr()) return userResult

      const user = userResult.value
      await this.userRepo.save(user)
      const tokenResponse = await new UserAuthHandler().create(email.value)

      if(tokenResponse.isErr())
        return tokenResponse

      const createUserSuccessResponse: CreateUserSuccess = {
        user,
        token: tokenResponse.value
      }

      return Result.ok(createUserSuccessResponse)
    } catch (err) {
      return Result.err(new AppError.UnexpectedError(err))
    }
  }
}
