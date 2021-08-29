import { Washroom } from '../../../modules/resources/domain/entities/washroom'
import { MockWashroomRepo } from '../../../modules/resources/repos'
import {
  GetWashroomByIdUseCase,
  GetWashroomByIdController,
} from '../../../modules/resources/use-cases/get-resource-by-id'

export function mockGetWashroomById(washrooms: Array<Washroom> = []) {
  const washroomRepo = new MockWashroomRepo(washrooms)
  const getWashroomByIdUseCase = new GetWashroomByIdUseCase(washroomRepo)
  const getWashroomByIdController = new GetWashroomByIdController(getWashroomByIdUseCase)

  return { washroomRepo, getWashroomByIdUseCase, getWashroomByIdController }
}
