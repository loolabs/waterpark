import express from 'express'
import { ValidationError } from 'joi'
import { BaseController } from '../../../../../shared/app/base-controller'
import { CreateUserUseCase } from './create-user-use-case'
import { CreateUserDTO, createUserDTOSchema } from './create-user-dto'
import { CreateUserErrors } from './create-user-errors'
import { UserValueObjectErrors } from '../../../domain/value-objects/errors'
import { Result } from '../../../../../shared/core/result'

export class CreateUserController extends BaseController<CreateUserDTO> {
  private useCase: CreateUserUseCase

  constructor(useCase: CreateUserUseCase) {
    super()
    this.useCase = useCase
  }

  validate(req: express.Request): Result<CreateUserDTO, ValidationError> {
    const { error, value } = createUserDTOSchema.validate(req.body)

    if (error) return Result.err(error)
    return Result.ok(value as CreateUserDTO)
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
