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
import { UserMap } from '../../../mappers/user-map'
import { UserDTO } from '../../../mappers/user-dto'
import { UserAuthHandler } from '../../../../../shared/auth/user-auth-handler'

export type CreateUserUseCaseError =
  | UserValueObjectErrors.InvalidEmail
  | UserValueObjectErrors.InvalidPassword
  | CreateUserErrors.EmailAlreadyExistsError
  | AppError.UnexpectedError

export type CreateUserSuccess = {
  user: UserDTO,
  token: string
}

export type CreateUserUseCaseResponse = Result<CreateUserSuccess, CreateUserUseCaseError>

export class CreateUserUseCase implements UseCaseWithDTO<CreateUserDTO, CreateUserUseCaseResponse> {
  private userRepo: UserRepo

  constructor(userRepo: UserRepo) {
    this.userRepo = userRepo
  }

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
    
      if (userAlreadyExists.isOk() && userAlreadyExists.value){
        return Result.err(new CreateUserErrors.EmailAlreadyExistsError(email.value))
      }
        
      const userResult = User.create({
        email,
        password,
      })
      if (userResult.isErr()) return userResult

      const user = userResult.value
      await this.userRepo.save(user)
      const updatedUser = await this.userRepo.getUserByUserEmail(email);
      if(updatedUser.isErr())
        return Result.err(new AppError.UnexpectedError(updatedUser.error.message))
      
        const tokenResponse = await new UserAuthHandler().create(updatedUser.value.id.toString())

      if(tokenResponse.isErr())
        return tokenResponse

      const createUserSuccessResponse: CreateUserSuccess = {
        user: UserMap.toDTO(user),
        token: tokenResponse.value
      }

      return Result.ok(createUserSuccessResponse)
    } catch (err) {
      return Result.err(new AppError.UnexpectedError(err))
    }
  }
}
