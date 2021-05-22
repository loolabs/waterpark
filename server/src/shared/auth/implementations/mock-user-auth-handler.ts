import { Result } from '../../core/result'
import { JWT_SECRET } from '../../core/secret'
import { UserMap } from '../../../modules/users/mappers/user-map'
import { AuthToken, UserAuthHandler, UserAuthHandlerCreateResponse, UserAuthHandlerLoginResponse, UserAuthHandlerLoginSuccess } from '../user-auth-handler'
import { AppError } from '../../core/app-error'
import express from 'express'
import { mocks } from '../../../test-utils'
import { CreateUserDTO } from '../../../modules/users/application/use-cases/create-user/create-user-dto'
import { sign } from 'jsonwebtoken'

export const JWT_EXPIRY_TIME_IN_SECONDS =  604800; //1 week = 604800 seconds

export const LOGIN_ERROR = 'login_error'
export const CREATE_ERROR = 'create_error'
 
//add implementation-specific auth functions here
export class MockUserAuthHandler implements UserAuthHandler {

  async login(req: express.Request, _res: express.Response): Promise<UserAuthHandlerLoginResponse> {
    return new Promise((resolve) => {
        if (req.body.status == LOGIN_ERROR) {
            resolve(Result.err(new AppError.UnexpectedError(LOGIN_ERROR)))
        } else {
            const createUserDTO: CreateUserDTO = {
                email: 'john.doe@uwaterloo.ca',
                password: 'secret',
            }
            const user = mocks.mockUser(createUserDTO)
            const token: AuthToken = sign({ userId: user.id }, JWT_SECRET, {expiresIn: JWT_EXPIRY_TIME_IN_SECONDS})
            const successResponse: UserAuthHandlerLoginSuccess = { user: UserMap.toDTO(user), authCert: token}
            resolve(Result.ok(successResponse))
        }
    })
  }

  async create(userId: string): Promise<UserAuthHandlerCreateResponse> {
    if (userId == CREATE_ERROR)
        return Result.err(new AppError.UnexpectedError("Account creation failed"))
    return Result.ok(userId)
  }
}
