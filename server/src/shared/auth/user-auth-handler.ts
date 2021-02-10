import passport from 'passport'
import { sign } from 'jsonwebtoken'
import { Result } from '../core/result'
import { LoginUserErrors } from '../../modules/users/application/use-cases/login-user/login-user-errors'
import { AppError } from '../core/app-error'
import { JWT_SECRET } from '../core/secret'
import { User } from '../../modules/users/domain/entities/user'

export type UserAuthHandlerLoginSuccess = {
  user: User,
  token: string
}

export type UserAuthHandlerLoginError = LoginUserErrors.IncorrectPasswordError |  AppError.UnexpectedError

export type UserAuthHandlerLoginResponse = Result<UserAuthHandlerLoginSuccess, UserAuthHandlerLoginError> 
 
//add implementation-specific auth functions here
export class UserAuthHandler {

  async login(): Promise<UserAuthHandlerLoginResponse> {
    let userAuthHandlerLoginResponse: UserAuthHandlerLoginResponse = Result.err(new AppError.UnexpectedError("Did not execute login."));
    passport.authenticate("local", (err, user) => {
      if (err) userAuthHandlerLoginResponse = Result.err(err)
      if (!user) {
        userAuthHandlerLoginResponse = Result.err(new LoginUserErrors.IncorrectPasswordError())
      } else {
        const token = sign({ email: user.email }, JWT_SECRET)
        const response: UserAuthHandlerLoginSuccess = { user, token }
        userAuthHandlerLoginResponse = Result.ok(response)
      }
    });
    return userAuthHandlerLoginResponse
  }

  async create(email: string): Promise<Result<string, AppError.UnexpectedError>> {
    const token = sign({ email: email }, JWT_SECRET);
    return Result.ok(token)
  }
}