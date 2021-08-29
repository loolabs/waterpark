import { Washroom } from '../../../modules/resources/domain/entities/washroom'
import { MockWashroomRepo } from '../../../modules/resources/repos'
import {
  GetAllWashroomsUseCase,
  GetAllWashroomsController,
} from '../../../modules/resources/use-cases/get-all-resources'

export function mockGetAllWashrooms(washrooms: Array<Washroom> = []) {
  const washroomRepo = new MockWashroomRepo(washrooms)
  const getAllWashroomsUseCase = new GetAllWashroomsUseCase(washroomRepo)
  const getAllWashroomsController = new GetAllWashroomsController(getAllWashroomsUseCase)

  return { washroomRepo, getAllWashroomsUseCase, getAllWashroomsController }
}
