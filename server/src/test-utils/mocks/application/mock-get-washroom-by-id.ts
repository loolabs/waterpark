import { WashroomEntity } from '../../../shared/infra/db/entities/places/washroom.entity'
import { MockWashroomRepo } from '../../../modules/resources/repos'
import {
  GetWashroomByIdUseCase,
  GetWashroomByIdController,
} from '../../../modules/resources/use-cases/get-resource-by-id'

export const mockGetWashroomById = (washroomEntities: Array<WashroomEntity> = []) => {
  const washroomRepo = new MockWashroomRepo(washroomEntities)
  const getWashroomByIdUseCase = new GetWashroomByIdUseCase(washroomRepo)
  const getWashroomByIdController = new GetWashroomByIdController(getWashroomByIdUseCase)

  return { washroomRepo, getWashroomByIdUseCase, getWashroomByIdController }
}
