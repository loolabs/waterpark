import express from 'express'
import { BaseController } from '../../../../../shared/app/base-controller'
import { GetAllClubsUseCase } from './get-all-clubs-use-case'
import { GetAllClubsDTO } from './get-all-clubs-dto'
import { GetAllClubsErrors } from './get-all-clubs-errors'
import { ClubValueObjectErrors } from '../../../domain/value-objects/errors'
import { DecodedExpressRequest } from '../../../../../shared/infra/http/routes/decoded-request'

export class GetAllClubsController extends BaseController {
  private useCase: GetAllClubsUseCase

  constructor(useCase: GetAllClubsUseCase) {
    super()
    this.useCase = useCase
  }

    
  async executeImpl(req: DecodedExpressRequest, res: express.Response): Promise<express.Response> {
    // TODO: add class validator/transformer
      
    const dto: GetAllClubsDTO = req.body as GetAllClubsDTO

    try {
      const result = await this.useCase.execute(dto)

      if (result.isOk()) {
        return this.ok(res)
      } else {
        const error = result.error

        switch (error.constructor) {
          case ClubValueObjectErrors.InvalidEmail:
            return this.clientError(res, error.message)
          case ClubValueObjectErrors.InvalidPassword:
            return this.clientError(res, error.message)
          case GetAllClubsErrors.EmailAlreadyExistsError:
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
