import express from 'express'
import { ControllerWithDTO } from '../../../../../shared/app/controller-with-dto'
import { CreateUserUseCase } from './create-user-use-case'
import { CreateUserErrors } from './create-user-errors'
import { UserValueObjectErrors } from '../../../domain/value-objects/errors'
import { Result } from '../../../../../shared/core/result'
import { dto } from '@loolabs/waterpark-common'
import { Errors } from 'io-ts'

export class CreateUserController extends ControllerWithDTO<CreateUserUseCase> {
  buildDTO(req: express.Request): Result<dto.CreateUser, Errors> {
    return this.validate(req.body, dto.tCreateUser)
  }

  async executeImpl<Res extends express.Response>(dto: dto.CreateUser, res: Res): Promise<Res> {
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
