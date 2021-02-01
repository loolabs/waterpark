import * as express from 'express'
import Joi, { ValidationError } from 'joi'
import { BaseUseCase } from './base-use-case'

type extractDTO<UseCase> = UseCase extends BaseUseCase<infer T, any> ? T : never

export abstract class BaseController<UseCase extends BaseUseCase<any, any>> {
  constructor(
    protected readonly useCase: UseCase,
    protected readonly schema: Joi.ObjectSchema<extractDTO<UseCase>>
  ) {}

  protected validate(
    body: unknown,
    onErr: (err: ValidationError) => void
  ): body is extractDTO<UseCase> {
    const { error } = this.schema.validate(body)
    if (error !== undefined) {
      onErr(error)
      return false
    }
    return true
  }

  public async execute(req: express.Request, res: express.Response): Promise<express.Response> {
    try {
      const onErr = (err: ValidationError) => {
        this.clientError(res, err.toString())
      }
      if (this.validate(req.body, onErr)) {
        await this.executeImpl(req.body, res)
      }
      return res
    } catch (err) {
      console.log(`[BaseController]: Uncaught controller error`)
      console.log(err)
      return this.fail(res, 'An unexpected error occurred')
    }
  }

  protected abstract executeImpl(
    dto: extractDTO<UseCase>,
    res: express.Response
  ): Promise<void | any>

  public ok<T>(res: express.Response, dto?: T): express.Response {
    if (dto) {
      res.type('application/json')
      return res.status(200).json(dto)
    } else {
      return res.sendStatus(200)
    }
  }

  public fail(res: express.Response, error: Error | string): express.Response {
    console.log(error)
    return res.status(500).json({
      message: error.toString(),
    })
  }

  public static jsonResponse(res: express.Response, code: number, message: string) {
    return res.status(code).json({ message })
  }

  public created(res: express.Response) {
    return res.sendStatus(201)
  }

  public clientError(res: express.Response, message: string = 'Unauthorized') {
    return BaseController.jsonResponse(res, 400, message)
  }

  public unauthorized(res: express.Response, message: string = 'Unauthorized') {
    return BaseController.jsonResponse(res, 401, message)
  }

  public paymentRequired(res: express.Response, message: string = 'Payment required') {
    return BaseController.jsonResponse(res, 402, message)
  }

  public forbidden(res: express.Response, message: string = 'Forbidden') {
    return BaseController.jsonResponse(res, 403, message)
  }

  public notFound(res: express.Response, message: string = 'Not found') {
    return BaseController.jsonResponse(res, 404, message)
  }

  public conflict(res: express.Response, message: string = 'Conflict') {
    return BaseController.jsonResponse(res, 409, message)
  }

  public tooMany(res: express.Response, message: string = 'Too many requests') {
    return BaseController.jsonResponse(res, 429, message)
  }

  public todo(res: express.Response, message: string = 'TODO') {
    return BaseController.jsonResponse(res, 400, message)
  }
}
