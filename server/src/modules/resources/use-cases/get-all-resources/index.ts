import { GetAllResourcesUseCase } from './get-all-resources-use-case'
import { GetAllResourcesController } from './get-all-resources-controller'
import { Washroom } from '../../domain/entities/washroom'
import { WashroomDTO } from '../../mappers/washroom-dto'
import { WashroomMap } from '../../mappers/washroom-map'
import { WashroomRepo } from '../../repos'

export { GetAllResourcesUseCase, GetAllResourcesController }

export class GetAllWashroomsUseCase extends GetAllResourcesUseCase<Washroom, WashroomDTO> {
  constructor(washroomRepo: WashroomRepo) {
    super(washroomRepo, WashroomMap)
  }
}

export class GetAllWashroomsController extends GetAllResourcesController<Washroom, WashroomDTO> {}
