import { WashroomEntity } from '../../../shared/infra/db/entities/places/washroom.entity';
import { MockWashroomRepo } from '../../../modules/washrooms/infra/repos/implementations/mock-washroom-repo';
import { GetAllWashroomsController } from '../../../modules/washrooms/application/use-cases/get-all-washrooms/get-all-washrooms-controller';
import { GetAllWashroomsUseCase } from '../../../modules/washrooms/application/use-cases/get-all-washrooms/get-all-washrooms-use-case';

const mockGetAllWashrooms = (washroomEntities: Array<WashroomEntity> = []) => {
  const washroomRepo = new MockWashroomRepo(washroomEntities);
  const getAllWashroomsUseCase = new GetAllWashroomsUseCase(washroomRepo);
  const getAllWashroomsController = new GetAllWashroomsController(getAllWashroomsUseCase);

  return { washroomRepo, getAllWashroomsUseCase, getAllWashroomsController };
};

export { mockGetAllWashrooms };
