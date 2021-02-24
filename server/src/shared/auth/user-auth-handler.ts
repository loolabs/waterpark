import passport from 'passport'
import express from 'express'
import { sign } from 'jsonwebtoken'
import { Result } from '../core/result'
import { LoginUserErrors } from '../../modules/users/application/use-cases/login-user/login-user-errors'
import { AppError } from '../core/app-error'
import { JWT_SECRET } from '../core/secret'
import '../../auth'
import { UserDTO } from '../../modules/users/mappers/user-dto'
import { UserMap } from '../../modules/users/mappers/user-map'
import { AuthenticateUserUseCaseResponse } from '../../modules/users/application/use-cases/authenticate-user/authenticate-user-use-case'

export type UserAuthHandlerLoginSuccess = {
  user: UserDTO,
  token: string
}

export type UserAuthHandlerLoginError = LoginUserErrors.IncorrectPasswordError |  AppError.UnexpectedError

export type UserAuthHandlerLoginResponse = Result<UserAuthHandlerLoginSuccess, UserAuthHandlerLoginError> 

export const JWT_EXPIRY_TIME_IN_SECONDS =  604800; //1 week = 604800 seconds
 
//add implementation-specific auth functions here
export class UserAuthHandler {

  async login(req: express.Request, res: express.Response): Promise<UserAuthHandlerLoginResponse> {
    return new Promise((resolve)=>{
      passport.authenticate("local", function(err, user: AuthenticateUserUseCaseResponse) {
        if (err) resolve(Result.err(err))
        if (user.isErr()) {
          resolve(Result.err(user.error))
        } else {
          const token = sign({ userId: user.value.id.toString() }, JWT_SECRET, {expiresIn: JWT_EXPIRY_TIME_IN_SECONDS})
          const successResponse: UserAuthHandlerLoginSuccess = { user: UserMap.toDTO(user.value), token }
          resolve(Result.ok(successResponse))
        }
      })(req,res);
    })
  }

  async create(userId: string): Promise<Result<string, AppError.UnexpectedError>> {
    const token = sign({ userId: userId }, JWT_SECRET, {expiresIn: JWT_EXPIRY_TIME_IN_SECONDS});
    return Result.ok(token)
  }
}