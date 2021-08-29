import { WashroomEntity } from '../../../shared/infra/db/entities/places/washroom.entity'
import { MockWashroomRepo } from '../../../modules/resources/repos'
import {
  GetAllWashroomsUseCase,
  GetAllWashroomsController,
} from '../../../modules/resources/use-cases/get-all-resources'

export const mockGetAllWashrooms = (washroomEntities: Array<WashroomEntity> = []) => {
  const washroomRepo = new MockWashroomRepo(washroomEntities)
  const getAllWashroomsUseCase = new GetAllWashroomsUseCase(washroomRepo)
  const getAllWashroomsController = new GetAllWashroomsController(getAllWashroomsUseCase)

  return { washroomRepo, getAllWashroomsUseCase, getAllWashroomsController }
}
