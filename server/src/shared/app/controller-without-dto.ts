import { BaseController } from './base-controller'
import { UseCaseWithoutDTO } from './use-case-without-dto'

export abstract class ControllerWithoutDTO<
  UseCase extends UseCaseWithoutDTO<any>
> extends BaseController {
  constructor(protected useCase: UseCase) {
    super()
  }
}
