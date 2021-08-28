import { Place } from '../../../modules/places/domain/entities/place'
import { MockPlaceRepo } from '../../../modules/places/repos/mock-place-repo'
import { GetAllPlacesController } from '../../../modules/places/use-cases/get-all-places/get-all-places-controller'
import { GetAllPlacesUseCase } from '../../../modules/places/use-cases/get-all-places/get-all-places-use-case'

const mockGetAllPlaces = (places: Array<Place> = []) => {
  const placeRepo = new MockPlaceRepo(places)
  const getAllPlacesUseCase = new GetAllPlacesUseCase(placeRepo)
  const getAllPlacesController = new GetAllPlacesController(getAllPlacesUseCase)

  return { placeRepo, getAllPlacesUseCase, getAllPlacesController }
}

export { mockGetAllPlaces }
