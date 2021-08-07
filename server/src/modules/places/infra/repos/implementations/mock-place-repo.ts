import { Place } from '../../../domain/entities/place';
import { PlaceEntity } from '../../../../../shared/infra/db/entities/places/place.entity';
import { PlaceMap } from '../../../mappers/place-map';
import { PlaceRepo } from '../place-repo';
import { Result } from '../../../../../shared/core/result';
import { AppError } from '../../../../../shared/core/app-error';

export class MockPlaceRepo implements PlaceRepo {
  constructor(protected eventEntities: Array<PlaceEntity> = []) {}

  async getAllPlaces(): Promise<Result<Array<Place>, AppError.UnexpectedError>> {
    return Result.ok(this.eventEntities.map(PlaceMap.toDomain));
  }
}
