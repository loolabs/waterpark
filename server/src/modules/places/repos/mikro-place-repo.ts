import { PlaceEntity } from '../../../shared/infra/db/entities/places/place.entity'
import { EntityRepository, QueryOrder } from '@mikro-orm/core'
import { Place } from '../domain/entities/place'
import { PlaceMap } from '../mappers/place-map'
import { PlaceRepo } from './place-repo'
import { Result } from '../../../shared/core/result'
import { AppError } from '../../../shared/core/app-error'

export class MikroPlaceRepo implements PlaceRepo {
  constructor(protected placesEntityRepo: EntityRepository<PlaceEntity>) {}

  async getAllPlaces(
    reviews: boolean = false
  ): Promise<Result<Array<Place>, AppError.UnexpectedError>> {
    const populateFields = ['tags']
    if (reviews) {
      populateFields.push('reviews')
    }

    try {
      const placeEntities: Array<PlaceEntity> = await this.placesEntityRepo.find(
        {},
        {
          populate: populateFields,
          orderBy: { name: QueryOrder.ASC_NULLS_LAST },
        }
      )
      const places = await Promise.all(placeEntities.map(PlaceMap.toDomain))
      return Result.ok(places)
    } catch (err: unknown) {
      // TODO: Fix unknown type error
      return Result.err(new AppError.UnexpectedError(String(err)))
    }
  }
}
