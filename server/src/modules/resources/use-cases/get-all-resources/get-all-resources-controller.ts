import express from 'express'
import { ControllerWithoutDTO } from '../../../../shared/app/controller-without-dto'
import { GetAllResourcesUseCase } from './get-all-resources-use-case'

export class GetAllResourcesController<Resource, ResourceDTO> extends ControllerWithoutDTO<
  GetAllResourcesUseCase<Resource, ResourceDTO>
> {
  async execute<Res extends express.Response>(_req: express.Request, res: Res): Promise<Res> {
    const result = await this.useCase.execute()
    if (result.isOk()) {
      return this.ok(res, result.value)
    } else {
      return this.fail(res, result.error.message)
    }
  }
}
