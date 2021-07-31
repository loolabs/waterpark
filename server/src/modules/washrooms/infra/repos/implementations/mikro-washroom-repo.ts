import { WashroomEntity } from '../../../../../shared/infra/db/entities/places/washroom.entity';
import { EntityRepository, QueryOrder } from '@mikro-orm/core';
import { Washroom } from '../../../domain/entities/washroom';
import { WashroomMap } from '../../../mappers/washroom-map';
import { WashroomRepo } from '../washroom-repo';
import { Result } from '../../../../../shared/core/result';
import { AppError } from '../../../../../shared/core/app-error';

export class MikroWashroomRepo implements WashroomRepo {
  constructor(protected washroomsEntityRepo: EntityRepository<WashroomEntity>) {}

  async getAllWashrooms(reviews: boolean = false): Promise<Result<Array<Washroom>, AppError.UnexpectedError>> {
    const populateFields = ['tags']
    if (reviews) {
      populateFields.push('reviews')
    }

    try {
      const washroomEntities: Array<WashroomEntity> = await this.washroomsEntityRepo.find(
        {},
        {
          populate: ['tags', 'reviews'],
          orderBy: { name: QueryOrder.ASC_NULLS_LAST },
        }
      );
      const places = await Promise.all(washroomEntities.map(WashroomMap.toDomain));
      return Result.ok(places);
    } catch (err: unknown) {
      // TODO: Fix unknown type error
      return Result.err(new AppError.UnexpectedError(String(err)));
    }
  }
}
