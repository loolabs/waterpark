import express from 'express'
import BaseController from './base-controller'
import { UseCaseWithDTO } from './use-case-with-dto'
import { Result } from '../../shared/core/result'
import Joi, { ValidationError } from 'joi'

type extractDTO<UseCase> = UseCase extends UseCaseWithDTO<infer T, any> ? T : never

export abstract class ControllerWithDTO<
  UseCase extends UseCaseWithDTO<any, any>
> extends BaseController {
  constructor(protected useCase: UseCase) {
    super()
  }

  protected abstract buildDTO(
    req: express.Request
  ): Result<extractDTO<UseCase>, Array<ValidationError>>

  protected validate<T>(obj: unknown, schema: Joi.ObjectSchema<T>): Result<T, ValidationError> {
    const { error } = schema.validate(obj)
    return error === undefined ? Result.ok(obj as T) : Result.err(error)
  }

  public async execute(req: express.Request, res: express.Response): Promise<express.Response> {
    try {
      const dtoResult = this.buildDTO(req)
      if (dtoResult.isOk()) {
        return await this.executeImpl(dtoResult.value, res)
      } else {
        const message = dtoResult.error.map((err) => err.message).join('\n\n')
        return this.clientError(res, message)
      }
    } catch (err) {
      console.log(`[BaseController]: Uncaught controller error`)
      console.log(err)
      return this.fail(res, 'An unexpected error occurred')
    }
  }

  protected abstract executeImpl(
    dto: extractDTO<UseCase>,
    res: express.Response
  ): Promise<express.Response | void | any>
}
