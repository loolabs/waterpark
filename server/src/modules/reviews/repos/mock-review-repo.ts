import { Review } from '../domain/entities/review'
import { ReviewRepo, ReviewRepoError, InvalidPlaceIdError } from './review-repo'
import { Result } from '../../../shared/core/result'

export class MockReviewRepo implements ReviewRepo {
  // TODO: replace placeIds list with a PlaceRepo, in case we want to mock Reviews and Places at the same time
  protected placeIds: Set<string>
  protected reviews: Array<Review>
  protected reviewsById: Map<string, Review>

  constructor(placeIds: Array<string>, reviews: Array<Review> = []) {
    this.placeIds = new Set(placeIds)
    this.reviews = reviews
    this.reviewsById = new Map(reviews.map((review) => [review.id.toString(), review]))
  }

  async exists(reviewId: string): Promise<Result<boolean, ReviewRepoError>> {
    try {
      return Result.ok(this.reviewsById.has(reviewId))
    } catch (err: unknown) {
      // TODO: Fix unknown type error
      return Result.err(new ReviewRepoError(String(err)))
    }
  }

  async insert(review: Review): Promise<Result<null, ReviewRepoError>> {
    try {
      const reviewId = review.id.toString()
      // see TODO in ReviewMap.toMikro
      /*
      const exists = await this.exists(reviewId)
      if (exists) return Result.err(new ReviewAlreadyExistsError(reviewId))
      */

      // Prevent adding a review to a place that does not exist
      const { placeId } = review
      if (!this.placeIds.has(placeId)) {
        return Result.err(new InvalidPlaceIdError(placeId))
      }

      this.reviews.push(review)
      this.reviewsById.set(reviewId, review)
      return Result.ok(null)
    } catch (err: unknown) {
      // TODO: Fix unknown type error
      return Result.err(new ReviewRepoError(String(err)))
    }
  }
}
