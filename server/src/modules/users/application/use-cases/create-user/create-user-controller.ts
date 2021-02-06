import express from 'express'
import { BaseController } from '../../../../../shared/app/base-controller'
import { CreateUserUseCase } from './create-user-use-case'
import { CreateUserDTO, createUserDTOSchema } from './create-user-dto'
import { CreateUserErrors } from './create-user-errors'
import { UserValueObjectErrors } from '../../../domain/value-objects/errors'

export class CreateUserController extends BaseController<CreateUserUseCase> {
  constructor(useCase: CreateUserUseCase) {
    super(useCase, createUserDTOSchema)
  }

  async executeImpl(dto: CreateUserDTO, res: express.Response): Promise<express.Response> {
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
          case CreateUserErrors.EmailAlreadyExistsError:
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
