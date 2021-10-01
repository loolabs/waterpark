import { UseCaseWithDTO } from '../../../../../shared/app/use-case-with-dto'
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

type CreateUserUseCaseResponse = Result<User, CreateUserUseCaseError>

export class CreateUserUseCase implements UseCaseWithDTO<CreateUserDTO, CreateUserUseCaseResponse> {
  constructor(private userRepo: UserRepo) {}

  async execute(dto: CreateUserDTO): Promise<CreateUserUseCaseResponse> {
    const emailResult = UserEmail.create(dto.email)
    const passwordResult = UserPassword.create({
      value: dto.password,
      hashed: false,
    })

    const results = [emailResult, passwordResult] as const
    if (!Result.resultsAllOk(results)) {
      return Result.err(Result.getFirstError(results).error)
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

      return Result.ok(user)
    } catch (err) {
      return Result.err(new AppError.UnexpectedError(String(err)))
    }
  }
}
