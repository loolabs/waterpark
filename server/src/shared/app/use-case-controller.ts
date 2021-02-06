import { TypedController } from './typed-controller'
import { BaseUseCase } from './base-use-case'

type extractDTO<UseCase> = UseCase extends BaseUseCase<infer T, any> ? T : never

export abstract class UseCaseController<UseCase> extends TypedController<extractDTO<UseCase>> {
  constructor(protected readonly useCase: UseCase) {
    super()
  }
}
