import express from 'express'
import { Result } from '../core/result'
import { LoginUserErrors } from '../../modules/users/application/use-cases/login-user/login-user-errors'
import { AppError } from '../core/app-error'
import '../../setup/http/express/auth'
import { UserDTO } from '../../modules/users/mappers/user-dto'

export type AuthToken = string
//if we choose to adopt other authentication certificate types (like csrf-tokens), this can change
export type AuthCertificate = AuthToken 

//establish success, error, and combined response types for all authentication methods

//login
export type UserAuthHandlerLoginSuccess = {
  user: UserDTO,
  authCert: AuthCertificate
}
export type UserAuthHandlerLoginError = LoginUserErrors.IncorrectPasswordError | AppError.UnexpectedError
export type UserAuthHandlerLoginResponse = Result<UserAuthHandlerLoginSuccess, UserAuthHandlerLoginError> 

//creation
export type UserAuthHandlerCreateSuccess = AuthCertificate
export type UserAuthHandlerCreateError = AppError.UnexpectedError
export type UserAuthHandlerCreateResponse = Result<UserAuthHandlerCreateSuccess, UserAuthHandlerCreateError> 

export abstract class UserAuthHandler {
  abstract login(req: express.Request, res: express.Response): Promise<UserAuthHandlerLoginResponse>
  abstract create(userId: string): Promise<UserAuthHandlerCreateResponse>
}
