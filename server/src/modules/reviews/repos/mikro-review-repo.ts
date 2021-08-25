import { EntityRepository } from '@mikro-orm/core'
import { Review } from '../domain/entities/review'
import { ReviewMap } from '../mappers/review-map'
import { ReviewRepo, ReviewRepoError } from './review-repo'
import { Result } from '../../../shared/core/result'
import { ReviewEntity } from '../../../shared/infra/db/entities/review.entity'
import { PlaceEntity } from '../../../shared/infra/db/entities/places/place.entity'

export class MikroReviewRepo implements ReviewRepo {
  constructor(
    protected reviewsEntityRepo: EntityRepository<ReviewEntity>,
    protected placesEntityRepo: EntityRepository<PlaceEntity>
  ) {}

  async exists(reviewId: string): Promise<Result<boolean, ReviewRepoError>> {
    try {
      const reviewEntity = await this.reviewsEntityRepo.findOne({ id: reviewId })
      return Result.ok(reviewEntity !== null)
    } catch (err: unknown) {
      // TODO: Fix unknown type error
      return Result.err(new ReviewRepoError(String(err)))
    }
  }

  async insert(review: Review): Promise<Result<null, ReviewRepoError>> {
    try {
      // see TODO in ReviewMap.toMikro
      /*
      const reviewId = review.id.toString()
      const exists = await this.exists(reviewId)
      if (exists) return Result.err(new ReviewAlreadyExistsError(reviewId))
      */

      const reviewEntity = await ReviewMap.toMikro(review, this.placesEntityRepo)
      this.reviewsEntityRepo.persist(reviewEntity)
      return Result.ok(null)
    } catch (err: unknown) {
      // TODO: Fix unknown type error
      // TODO: ReviewMap.toMikro probably throws something if the placeID on the entity is invalid.
      //       We should add a catch for that specific error (probably in ReviewMap) and transform
      //       it into an InvalidPlaceIdError
      return Result.err(new ReviewRepoError(String(err)))
    }
  }
}
