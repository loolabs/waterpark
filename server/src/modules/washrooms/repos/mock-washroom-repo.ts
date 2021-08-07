import { Washroom } from '../domain/entities/washroom';
import { WashroomEntity } from '../../../shared/infra/db/entities/places/washroom.entity';
import { WashroomMap } from '../mappers/washroom-map';
import { WashroomRepo, WashroomOptions } from './washroom-repo';
import { Result } from '../../../shared/core/result';
import { AppError } from '../../../shared/core/app-error';

export class MockWashroomRepo implements WashroomRepo {
  // the mock repo ignores WashroomOptions.mustIncludeReviews

  protected washroomEntitiesById: Map<string, WashroomEntity>;

  constructor(protected washroomEntities: Array<WashroomEntity> = []) {
    this.washroomEntitiesById = new Map();
    for (const washroomEntity of washroomEntities) {
      this.washroomEntitiesById.set(washroomEntity.place.id, washroomEntity);
    }
  }

  async getAllWashrooms(
    _options?: WashroomOptions
  ): Promise<Result<Array<Washroom>, AppError.UnexpectedError>> {
    return Result.ok(this.washroomEntities.map(WashroomMap.toDomain));
  }

  async getWashroomById(
    id: string,
    _options?: WashroomOptions
  ): Promise<Result<Washroom, AppError.UnexpectedError>> {
    const washroomEntity = this.washroomEntitiesById.get(id);
    if (washroomEntity === undefined) {
      return Result.err(new AppError.UnexpectedError('Washroom not found')); // TODO: proper error classes
    }
    const washroom = WashroomMap.toDomain(washroomEntity);
    return Result.ok(washroom);
  }
}
