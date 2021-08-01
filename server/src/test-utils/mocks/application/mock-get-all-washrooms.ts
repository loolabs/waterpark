import { WashroomEntity } from '../../../shared/infra/db/entities/places/washroom.entity';
import { MockWashroomRepo } from '../../../modules/washrooms/repos/mock-washroom-repo';
import { GetAllWashroomsController } from '../../../modules/washrooms/use-cases/get-all-washrooms/get-all-washrooms-controller';
import { GetAllWashroomsUseCase } from '../../../modules/washrooms/use-cases/get-all-washrooms/get-all-washrooms-use-case';

const mockGetAllWashrooms = (washroomEntities: Array<WashroomEntity> = []) => {
  const washroomRepo = new MockWashroomRepo(washroomEntities);
  const getAllWashroomsUseCase = new GetAllWashroomsUseCase(washroomRepo);
  const getAllWashroomsController = new GetAllWashroomsController(getAllWashroomsUseCase);

  return { washroomRepo, getAllWashroomsUseCase, getAllWashroomsController };
};

export { mockGetAllWashrooms };
