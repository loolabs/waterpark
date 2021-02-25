import express from 'express'
import { ControllerWithDTO } from '../../../../../shared/app/controller-with-dto'
import { ProtectedUserUseCase } from './protected-user-use-case'
import { ProtectedUserDTO, protectedUserDTOSchema } from './protected-user-dto'
import { Result } from '../../../../../shared/core/result'
import { ValidationError } from 'joi'

export class ProtectedUserController extends ControllerWithDTO<ProtectedUserUseCase> {
  constructor(useCase: ProtectedUserUseCase) { super(useCase) }

  buildDTO(req: express.Request): Result<ProtectedUserDTO, Array<ValidationError>> {
    const errs: Array<ValidationError> = []
    const bodyResult = this.validate(req.body, protectedUserDTOSchema)
    if (bodyResult.isOk()) {
      const body = bodyResult.value
      return Result.ok(body)
    } else {
      errs.push(bodyResult.error)
      return Result.err(errs)
    }
  }

  async executeImpl(dto: ProtectedUserDTO, res: express.Response): Promise<express.Response> {
    try {
      const result = await this.useCase.execute(dto)
      
      if (result.isOk()) {
        return this.ok(res, result.value)
      } else {
        const error = result.error

        switch (error.constructor) {
          default:
            return this.fail(res, error.message)
        }
      }
    } catch (err) {
      return this.fail(res, err)
    }
  }
}
