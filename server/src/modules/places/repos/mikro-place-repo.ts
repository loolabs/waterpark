import { PlaceEntity } from '../../../shared/infra/db/entities/places/place.entity'
import { EntityRepository, QueryOrder } from '@mikro-orm/core'
import { Place } from '../domain/entities/place'
import { PlaceMap } from '../mappers/place-map'
import { PlaceRepo, PlaceOptions } from './place-repo'
import { Result } from '../../../shared/core/result'
import { AppError } from '../../../shared/core/app-error'
import { UniqueEntityID } from '../../../shared/domain/unique-entity-id'

export class MikroPlaceRepo implements PlaceRepo {
  constructor(protected placesEntityRepo: EntityRepository<PlaceEntity>) {}

  async getAllPlaces({ mustIncludeReviews }: PlaceOptions = {}): Promise<
    Result<Array<Place>, AppError.UnexpectedError>
  > {
    const populateFields = ['tags']
    if (mustIncludeReviews) {
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

  async exists(placeId: UniqueEntityID): Promise<Result<boolean, AppError.UnexpectedError>> {
    try {
      const placeEntity = await this.placesEntityRepo.findOne({ id: placeId.toString() })
      return Result.ok(placeEntity !== null)
    } catch (err: unknown) {
      // TODO: Fix unknown type error
      return Result.err(new AppError.UnexpectedError(String(err)))
    }
  }
}
