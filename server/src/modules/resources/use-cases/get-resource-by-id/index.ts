import { GetResourceByIdUseCase } from './get-resource-by-id-use-case'
import { GetResourceByIdController } from './get-resource-by-id-controller'
import { Washroom } from '../../domain/entities/washroom'
import { WashroomDTO } from '../../mappers/washroom-dto'
import { WashroomMap } from '../../mappers/washroom-map'
import { WashroomRepo } from '../../repos'

export { GetResourceByIdUseCase, GetResourceByIdController }

export class GetWashroomByIdUseCase extends GetResourceByIdUseCase<Washroom, WashroomDTO> {
  constructor(washroomRepo: WashroomRepo) {
    super(washroomRepo, WashroomMap)
  }
}

export class GetWashroomByIdController extends GetResourceByIdController<Washroom, WashroomDTO> {}
