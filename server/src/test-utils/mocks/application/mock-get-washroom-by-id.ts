import { WashroomEntity } from '../../../shared/infra/db/entities/places/washroom.entity';
import { MockWashroomRepo } from '../../../modules/washrooms/repos/mock-washroom-repo';
import { GetWashroomByIdController } from '../../../modules/washrooms/use-cases/get-washroom-by-id/get-washroom-by-id-controller';
import { GetWashroomByIdUseCase } from '../../../modules/washrooms/use-cases/get-washroom-by-id/get-washroom-by-id-use-case';

const mockGetWashroomById = (washroomEntities: Array<WashroomEntity> = []) => {
  const washroomRepo = new MockWashroomRepo(washroomEntities);
  const getWashroomByIdUseCase = new GetWashroomByIdUseCase(washroomRepo);
  const getWashroomByIdController = new GetWashroomByIdController(getWashroomByIdUseCase);

  return { washroomRepo, getWashroomByIdUseCase, getWashroomByIdController };
};

export { mockGetWashroomById };
