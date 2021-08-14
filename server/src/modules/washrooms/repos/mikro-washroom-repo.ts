import { WashroomEntity } from '../../../shared/infra/db/entities/places/washroom.entity'
import { EntityRepository, QueryOrder } from '@mikro-orm/core'
import { Washroom } from '../domain/entities/washroom'
import { WashroomMap } from '../mappers/washroom-map'
import { WashroomRepo, WashroomOptions } from './washroom-repo'
import { Result } from '../../../shared/core/result'
import { AppError } from '../../../shared/core/app-error'

export class MikroWashroomRepo implements WashroomRepo {
  constructor(protected washroomsEntityRepo: EntityRepository<WashroomEntity>) {}

  async getAllWashrooms({
    mustIncludeReviews,
  }: WashroomOptions): Promise<Result<Array<Washroom>, AppError.UnexpectedError>> {
    const populateFields = ['tags']
    if (mustIncludeReviews === true) {
      populateFields.push('reviews')
    }

    try {
      const washroomEntities: Array<WashroomEntity> = await this.washroomsEntityRepo.find(
        {},
        {
          populate: populateFields,
          orderBy: { name: QueryOrder.ASC_NULLS_LAST },
        }
      )
      const places = await Promise.all(washroomEntities.map(WashroomMap.toDomain))
      return Result.ok(places)
    } catch (err: unknown) {
      // TODO: Fix unknown type error
      return Result.err(new AppError.UnexpectedError(String(err)))
    }
  }

  async getWashroomById(
    id: string,
    { mustIncludeReviews }: WashroomOptions
  ): Promise<Result<Washroom, AppError.UnexpectedError>> {
    const populateFields = ['tags']
    if (mustIncludeReviews === true) {
      populateFields.push('reviews')
    }

    try {
      const washroomEntity = await this.washroomsEntityRepo.findOne(
        { place: { id } },
        {
          populate: populateFields,
        }
      )
      if (washroomEntity === null) {
        // TODO: Create proper error classes
        return Result.err(new AppError.UnexpectedError('Washroom not found'))
      }
      const washroom = await WashroomMap.toDomain(washroomEntity)
      return Result.ok(washroom)
    } catch (err: unknown) {
      // TODO: Fix unknown type error
      return Result.err(new AppError.UnexpectedError(String(err)))
    }
  }
}
