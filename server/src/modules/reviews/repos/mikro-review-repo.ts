import { EntityRepository } from '@mikro-orm/core'
import { Review } from '../domain/entities/review'
import { ReviewMap } from '../mappers/review-map'
import { ReviewRepo, ReviewRepoError } from './review-repo'
import { Result } from '../../../shared/core/result'
import { ReviewEntity } from '../../../shared/infra/db/entities/review.entity'
import { PlaceEntity } from '../../../shared/infra/db/entities/places/place.entity'
import { UniqueEntityID } from '../../../shared/domain/unique-entity-id'

export class MikroReviewRepo extends ReviewRepo {
  constructor(
    protected reviewsEntityRepo: EntityRepository<ReviewEntity>,
    protected placesEntityRepo: EntityRepository<PlaceEntity>
  ) {
    super()
  }

  async exists(reviewId: UniqueEntityID): Promise<Result<boolean, ReviewRepoError>> {
    try {
      const reviewEntity = await this.reviewsEntityRepo.findOne({ id: reviewId.toString() })
      return Result.ok(reviewEntity !== null)
    } catch (err: unknown) {
      // TODO: Fix unknown type error
      return Result.err(new ReviewRepoError(String(err)))
    }
  }

  async upsert(review: Review): Promise<Result<null, ReviewRepoError>> {
    try {
      const reviewEntity = await ReviewMap.toMikroPersistence(review, this.placesEntityRepo)

      this.reviewsEntityRepo.persist(reviewEntity)
      return Result.ok(null)
    } catch (err: unknown) {
      // TODO: Fix unknown type error
      return Result.err(new ReviewRepoError(String(err)))
    }
  }
}
