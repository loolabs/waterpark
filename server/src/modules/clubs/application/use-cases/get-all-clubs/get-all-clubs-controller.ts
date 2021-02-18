import express from 'express'
import { ControllerWithoutDTO } from '../../../../../shared/app/controller-without-dto'
import { GetAllClubsUseCase } from './get-all-clubs-use-case'

export class GetAllClubsController extends ControllerWithoutDTO<GetAllClubsUseCase> {
  constructor(useCase: GetAllClubsUseCase) {
    super(useCase)
  }

  async execute(_req: express.Request, res: express.Response): Promise<express.Response> {
    try {
      const result = await this.useCase.execute()
      if (result.isOk()) {
        return this.ok(res, result.value)
      } else {
        return this.fail(res, result.error.message)
      }
    } catch (err) {
      return this.fail(res, err)
    }
  }
}
