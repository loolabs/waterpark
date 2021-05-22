import { UseCaseWithDTO } from '../../../../../shared/app/use-case-with-dto'
import { UserAuthHandler, UserAuthHandlerLoginResponse } from '../../../../../shared/auth/user-auth-handler'
import  '../../../../../shared/auth/user-auth-handler'
import { LoginUserDTO } from './login-user-dto'

export class LoginUserUseCase
  implements UseCaseWithDTO<LoginUserDTO, UserAuthHandlerLoginResponse> {
  private userAuthHandler: UserAuthHandler

  constructor(userAuthHandler: UserAuthHandler) {
    this.userAuthHandler = userAuthHandler
  }

  async execute(dto: LoginUserDTO): Promise<UserAuthHandlerLoginResponse> {
    const userAuthHandlerLoginResponse: UserAuthHandlerLoginResponse = await this.userAuthHandler.login(dto.req, dto.res)
    return userAuthHandlerLoginResponse
  }
}
