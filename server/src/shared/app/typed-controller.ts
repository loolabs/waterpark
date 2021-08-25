import * as t from 'io-ts'
import { Request, Response } from 'express'
import { BaseController } from './base-controller'
import { UseCaseWithDTO } from './use-case-with-dto'
import { Result, Ok, Err } from '../core/result'
import { PathReporter } from 'io-ts/lib/PathReporter'
import { toResult, toEither } from '../core/validation'

type getArgs<UseCase> = UseCase extends UseCaseWithDTO<infer T, any> ? T : never
type getResult<UseCase> = UseCase extends UseCaseWithDTO<any, infer T> ? T : never
export type ValidationErrors = t.Errors

export abstract class TypedController<
  UseCase extends UseCaseWithDTO<any, any>,
  UCResult = getResult<UseCase>,
  UCArgs extends getArgs<UseCase> = getArgs<UseCase>
> extends BaseController {
  constructor(protected useCase: UseCase) {
    super()
  }

  // Utilities
  protected validate<T>(obj: unknown, type: t.Type<T>): Result<T, ValidationErrors> {
    return toResult(type.decode(obj))
  }

  // Things that must be overridden
  protected abstract buildArgs(req: Request): Result<UCArgs, ValidationErrors>
  protected abstract onResult<Res extends Response>(
    req: Request,
    res: Res,
    result: UCResult
  ): Promise<Res>

  // Default implementations of things that could be overridden
  protected async onArgsOk<Res extends Response>(
    req: Request,
    res: Res,
    args: Ok<UCArgs, ValidationErrors>
  ): Promise<Res> {
    const result: getResult<UseCase> = await this.useCase.execute(args.value)
    return this.onResult(req, res, result)
  }
  protected async onArgsErr<Res extends Response>(
    _: Request,
    res: Res,
    args: Err<UCArgs, ValidationErrors>
  ): Promise<Res> {
    const message = PathReporter.report(toEither(args)).join('\n\n')
    return this.clientError(res, message)
  }

  // Implement BaseController
  public async execute<Res extends Response>(req: Request, res: Res): Promise<Res> {
    try {
      const args = this.buildArgs(req)
      if (args.isOk()) {
        return await this.onArgsOk(req, res, args)
      } else {
        return await this.onArgsErr(req, res, args)
      }
    } catch (err) {
      console.error(`[IOController]: Uncaught controller error\n${err}`)
      return this.fail(res, 'An unexpected error occurred')
    }
  }
}
