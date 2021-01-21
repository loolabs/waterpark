import express from 'express'
//import passport from 'passport'
//import passportLocal from 'passport-local'
import { BaseController } from '../../../../../shared/app/base-controller'
import { LoginUserUseCase } from './login-user-use-case'
import { LoginUserDTO } from './login-user-dto'
import { LoginUserErrors } from './login-user-errors'
import { UserValueObjectErrors } from '../../../domain/value-objects/errors'
import { DecodedExpressRequest } from '../../../../../shared/infra/http/routes/decoded-request'

export class LoginUserController extends BaseController {
  private useCase: LoginUserUseCase

  constructor(useCase: LoginUserUseCase) {
    super()
    this.useCase = useCase
  }

  async executeImpl(req: DecodedExpressRequest, res: express.Response): Promise<express.Response> {
    // TODO: add class validator/transformer
    const dto: LoginUserDTO = req.body as LoginUserDTO

    try {
      const result = await this.useCase.execute(dto)

      if (result.isOk()) {
        return this.ok(res)
      } else {
        const error = result.error

        switch (error.constructor) {
          case UserValueObjectErrors.InvalidEmail:
            return this.clientError(res, error.message)
          case UserValueObjectErrors.InvalidPassword:
            return this.clientError(res, error.message)
          case LoginUserErrors.IncorrectPasswordError:
            return this.conflict(res, error.message)
          default:
            return this.fail(res, error.message)
        }
      }
    } catch (err) {
      return this.fail(res, err)
    }
  }
}
