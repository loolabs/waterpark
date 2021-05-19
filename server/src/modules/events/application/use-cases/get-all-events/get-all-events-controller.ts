import express from 'express'
import { ControllerWithoutDTO } from '../../../../../shared/app/controller-without-dto'
import { GetAllEventsUseCase } from './get-all-events-use-case'

export class GetAllEventsController extends ControllerWithoutDTO<GetAllEventsUseCase> {
  constructor(useCase: GetAllEventsUseCase) {
    super(useCase)
  }

  async execute<Res extends express.Response>(_req: express.Request, res: Res): Promise<Res> {
    const result = await this.useCase.execute()
    if (result.isOk()) {
      return this.ok(res, result.value)
    } else {
      return this.fail(res, result.error.message)
    }
  }
}
