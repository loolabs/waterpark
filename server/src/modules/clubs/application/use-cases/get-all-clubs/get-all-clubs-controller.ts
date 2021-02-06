import express from 'express'
import { BaseController } from '../../../../../shared/app/base-controller'
import { GetAllClubsUseCase } from './get-all-clubs-use-case'
// import { ClubValueObjectErrors } from '../../../domain/value-objects/errors'
import { DecodedExpressRequest } from '../../../../../shared/infra/http/routes/decoded-request'
import Joi from 'joi'
export class GetAllClubsController extends BaseController<GetAllClubsUseCase> {
  constructor(useCase: GetAllClubsUseCase) {
    super(useCase, Joi.object())
  }

  async executeImpl(_req: DecodedExpressRequest, res: express.Response): Promise<express.Response> {
    try {
      const result = await this.useCase.execute()

      if (result.isOk()) {
        return this.ok(res, result.value)
      } else {
        const error = result.error

        switch (error.constructor) {
          //   case ClubValueObjectErrors.InvalidEmail:
          //     return this.clientError(res, error.message)
          //   case ClubValueObjectErrors.InvalidPassword:
          //     return this.clientError(res, error.message)
          default:
            return this.fail(res, error.message)
        }
      }
    } catch (err) {
      return this.fail(res, err)
    }
  }
}
