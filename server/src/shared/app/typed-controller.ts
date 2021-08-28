import { z } from 'zod'
import express from 'express'
import { Result } from '../core/result'
import { ValidationError } from '../core/validation'
import { BaseController } from './base-controller'
import { UseCaseWithDTO } from './use-case-with-dto'

type getArgs<UseCase> = UseCase extends UseCaseWithDTO<infer T, any> ? T : never
type getResult<UseCase> = UseCase extends UseCaseWithDTO<any, infer T> ? T : never

export abstract class TypedController<
  UseCase extends UseCaseWithDTO<any, any>,
  UseCaseResult = getResult<UseCase>,
  UseCaseArgs extends getArgs<UseCase> = getArgs<UseCase>
> extends BaseController {
  constructor(protected useCase: UseCase) {
    super()
  }

  // Utilities
  protected validate<T>(data: unknown, type: z.ZodType<T>): Result<T, ValidationError> {
    const parsed = type.safeParse(data)
    return parsed.success ? Result.ok(parsed.data) : Result.err(parsed.error)
  }

  // Things that must be overridden
  protected abstract buildArgs(req: express.Request): Result<UseCaseArgs, ValidationError>
  protected abstract onResult<Res extends express.Response>(
    req: express.Request,
    res: Res,
    result: UseCaseResult
  ): Promise<Res>

  // Default implementations of things that could be overridden
  protected async onArgsOk<Res extends express.Response>(
    req: express.Request,
    res: Res,
    args: UseCaseArgs
  ): Promise<Res> {
    const result: getResult<UseCase> = await this.useCase.execute(args.value)
    return this.onResult(req, res, result)
  }
  protected async onArgsErr<Res extends express.Response>(
    _: express.Request,
    res: Res,
    err: ValidationError
  ): Promise<Res> {
    return this.badRequest(res, err.toString())
  }

  // Implement BaseController
  public async execute<Res extends express.Response>(req: express.Request, res: Res): Promise<Res> {
    try {
      const args = this.buildArgs(req)
      if (args.isOk()) {
        return await this.onArgsOk(req, res, args.value)
      } else {
        return await this.onArgsErr(req, res, args.error)
      }
    } catch (err) {
      console.error(`[IOController]: Uncaught controller error\n${err}`)
      return this.fail(res, 'An unexpected error occurred')
    }
  }
}
