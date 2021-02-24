import * as express from 'express'
import Joi, { ValidationError } from 'joi'
import { Result } from '../core/result'
import { BaseController } from './base-controller'

export abstract class TypedController<DTO> extends BaseController {
  protected abstract buildDTO(req: express.Request, res?: express.Response): Result<DTO, Array<ValidationError>>

  protected validate<T>(obj: unknown, schema: Joi.ObjectSchema<T>): Result<T, ValidationError> {
    const { error } = schema.validate(obj)
    return (error === undefined) ? Result.ok(obj as T) : Result.err(error)
  }

  public async execute(req: express.Request, res: express.Response): Promise<express.Response> {
    try {
      const dtoResult = this.buildDTO(req, res)
      if (dtoResult.isOk()) {
        return await this.executeImpl(dtoResult.value, res)
      } else {
        const message = dtoResult.error.map(err => err.message).join('\n\n')
        return this.clientError(res, message)
      }
    } catch (err) {
      console.log(`[BaseController]: Uncaught controller error`)
      console.log(err)
      return this.fail(res, 'An unexpected error occurred')
    }
  }

  protected abstract executeImpl(dto: DTO, res: express.Response): Promise<express.Response | void | any>
}
