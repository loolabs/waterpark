import { mockPlaceEntity } from '../places/mock-place-entity';
import { WashroomEntity } from '../../../../shared/infra/db/entities/places/washroom.entity';

const mockWashroomEntity = (id: string): WashroomEntity => {
  const washroomEntity = new WashroomEntity(mockPlaceEntity(id));
  return washroomEntity;
};

export { mockWashroomEntity };
