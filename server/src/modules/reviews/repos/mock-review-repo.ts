import { Review } from '../domain/entities/review'
import { ReviewRepo, ReviewRepoError } from './review-repo'
import { Result } from '../../../shared/core/result'
import { UniqueEntityID } from '../../../shared/domain/unique-entity-id'

export class MockReviewRepo extends ReviewRepo {
  protected reviews: Array<Review>
  protected reviewsById: Map<UniqueEntityID, Review>

  constructor(reviews: Array<Review> = []) {
    super()
    this.reviews = reviews
    this.reviewsById = new Map(reviews.map((review) => [review.id, review]))
  }

  async exists(reviewId: UniqueEntityID): Promise<Result<boolean, ReviewRepoError>> {
    return Result.ok(this.reviewsById.has(reviewId))
  }

  async upsert(review: Review): Promise<Result<null, ReviewRepoError>> {
    this.reviewsById.set(review.id, review)
    return Result.ok(null)
  }
}
