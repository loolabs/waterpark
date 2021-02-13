import { BaseUseCase } from '../../../../../shared/app/base-use-case'
import { UserAuthHandler, UserAuthHandlerLoginResponse } from '../../../../../shared/auth/user-auth-handler'
import { LoginUserDTO } from './login-user-dto'

export class LoginUserUseCase
  implements BaseUseCase<LoginUserDTO, Promise<UserAuthHandlerLoginResponse>> {
  private userAuthHandler: UserAuthHandler

  constructor(userAuthHandler: UserAuthHandler) {
    this.userAuthHandler = userAuthHandler
  }

  async execute(_request: LoginUserDTO): Promise<UserAuthHandlerLoginResponse> {
    const userAuthHandlerLoginResponse: UserAuthHandlerLoginResponse = await this.userAuthHandler.login()
    return userAuthHandlerLoginResponse
  }
}
