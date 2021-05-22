import passport from 'passport'
import express from 'express'
import { sign } from 'jsonwebtoken'
import { Result } from '../../core/result'
import { JWT_SECRET } from '../../core/secret'
//import '../../auth'
import { UserMap } from '../../../modules/users/mappers/user-map'
import { AuthenticateUserUseCaseResponse } from '../../../modules/users/application/use-cases/authenticate-user/authenticate-user-use-case'
import { AuthToken, UserAuthHandler, UserAuthHandlerCreateResponse, UserAuthHandlerLoginResponse, UserAuthHandlerLoginSuccess } from '../user-auth-handler'

export const JWT_EXPIRY_TIME_IN_SECONDS =  604800; //1 week = 604800 seconds
 
//add implementation-specific auth functions here
export class PassportUserAuthHandler implements UserAuthHandler {

  async login(req: express.Request, res: express.Response): Promise<UserAuthHandlerLoginResponse> {
    return new Promise((resolve) => {
      passport.authenticate("local", function(err, user: AuthenticateUserUseCaseResponse) {
        if (err) resolve(Result.err(err))
        if (user.isErr()) {
          resolve(Result.err(user.error))
        } else {
          const token: AuthToken = sign({ userId: user.value.id.toString() }, JWT_SECRET, {expiresIn: JWT_EXPIRY_TIME_IN_SECONDS})
          const successResponse: UserAuthHandlerLoginSuccess = { user: UserMap.toDTO(user.value), authCert: token}
          resolve(Result.ok(successResponse))
        }
      })(req,res);
    })
  }

  async create(userId: string): Promise<UserAuthHandlerCreateResponse> {
    const token = sign({ userId: userId }, JWT_SECRET, {expiresIn: JWT_EXPIRY_TIME_IN_SECONDS});
    return Result.ok(token)
  }
}
