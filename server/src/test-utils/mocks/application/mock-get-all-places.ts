import { PlaceEntity } from '../../../shared/infra/db/entities/places/place.entity';
import { MockPlaceRepo } from '../../../modules/places/infra/repos/implementations/mock-place-repo';
import { GetAllPlacesController } from '../../../modules/places/application/use-cases/get-all-places/get-all-places-controller';
import { GetAllPlacesUseCase } from '../../../modules/places/application/use-cases/get-all-places/get-all-places-use-case';

const mockGetAllPlaces = (placeEntities: Array<PlaceEntity> = []) => {
  const placeRepo = new MockPlaceRepo(placeEntities);
  const getAllPlacesUseCase = new GetAllPlacesUseCase(placeRepo);
  const getAllPlacesController = new GetAllPlacesController(getAllPlacesUseCase);

  return { placeRepo, getAllPlacesUseCase, getAllPlacesController };
};

export { mockGetAllPlaces };
