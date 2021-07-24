import { PlaceEntity } from './../../../../../shared/infra/db/entities/places/place.entity';
import { EntityRepository, QueryOrder } from '@mikro-orm/core';
import { Place } from '../../../domain/entities/place';
import { PlaceMap } from '../../../mappers/place-map';
import { PlaceRepo } from '../place-repo';
import { Result } from '../../../../../shared/core/result';
import { AppError } from '../../../../../shared/core/app-error';

export class MikroPlaceRepo implements PlaceRepo {
  constructor(protected placesEntityRepo: EntityRepository<PlaceEntity>) {}

  async getAllPlaces(): Promise<Result<Array<Place>, AppError.UnexpectedError>> {
    try {
      const placeEntities: Array<PlaceEntity> = await this.placesEntityRepo.find(
        {},
        {
          populate: ['tags', 'reviews'],
          orderBy: { name: QueryOrder.ASC_NULLS_LAST },
        }
      );
      console.log(placeEntities);
      const places = await Promise.all(placeEntities.map(PlaceMap.toDomain));
      return Result.ok(places);
    } catch (err) {
      // TODO: Fix unknown type error
      return Result.err(new AppError.UnexpectedError(err));
    }
  }
}
