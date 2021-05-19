import express from 'express'
import { ControllerWithDTO } from '../../../../../shared/app/controller-with-dto'
import { CreateUserUseCase } from './create-user-use-case'
import { CreateUserDTO, createUserDTOSchema } from './create-user-dto'
import { CreateUserErrors } from './create-user-errors'
import { UserValueObjectErrors } from '../../../domain/value-objects/errors'
import { Result } from '../../../../../shared/core/result'
import { ValidationError } from 'joi'

export class CreateUserController extends ControllerWithDTO<CreateUserUseCase> {
  constructor(useCase: CreateUserUseCase) {
    super(useCase)
  }

  buildDTO(req: express.Request): Result<CreateUserDTO, Array<ValidationError>> {
    const errs: Array<ValidationError> = []
    const bodyResult = this.validate(req.body, createUserDTOSchema)
    if (bodyResult.isOk()) {
      const body = bodyResult.value
      return Result.ok(body)
    } else {
      errs.push(bodyResult.error)
      return Result.err(errs)
    }
  }

  async executeImpl<Res extends express.Response>(dto: CreateUserDTO, res: Res): Promise<Res> {
    try {
      const result = await this.useCase.execute(dto)
      
      if (result.isOk()) {
        return this.ok(res, result.value)
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
