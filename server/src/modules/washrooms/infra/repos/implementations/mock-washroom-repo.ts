import { Washroom } from '../../../domain/entities/washroom';
import { WashroomEntity } from '../../../../../shared/infra/db/entities/places/washroom.entity';
import { WashroomMap } from '../../../mappers/washroom-map';
import { WashroomRepo } from '../washroom-repo';
import { Result } from '../../../../../shared/core/result';
import { AppError } from '../../../../../shared/core/app-error';

export class MockWashroomRepo implements WashroomRepo {
  constructor(protected eventEntities: Array<WashroomEntity> = []) {}

  async getAllWashrooms(): Promise<Result<Array<Washroom>, AppError.UnexpectedError>> {
    return Result.ok(this.eventEntities.map(WashroomMap.toDomain));
  }
}
