import { ValidationError } from 'joi'
import express from 'express'
import { ControllerWithDTO } from '../../../../shared/app/controller-with-dto'
import { Result } from '../../../../shared/core/result'
import { GetResourceByIdUseCase, DTO } from './get-resource-by-id-use-case'

export class GetResourceByIdController<Resource, ResourceDTO> extends ControllerWithDTO<
  GetResourceByIdUseCase<Resource, ResourceDTO>
> {
  constructor(useCase: GetResourceByIdUseCase<Resource, ResourceDTO>) {
    super(useCase)
  }

  protected buildDTO(req: express.Request): Result<DTO, Array<ValidationError>> {
    // TODO: implement actual validation once API type changes (io-ts) are in
    const { id } = req.params
    return Result.ok({ id })
  }

  async executeImpl<Res extends express.Response>(dto: DTO, res: Res): Promise<Res> {
    const result = await this.useCase.execute(dto)
    if (result.isOk()) {
      return this.ok(res, result.value)
    } else {
      return this.fail(res, result.error.message)
    }
  }
}
