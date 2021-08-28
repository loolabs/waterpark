import { Review } from '../domain/entities/review'
import { Result } from '../../../shared/core/result'
import { AppError } from '../../../shared/core/app-error'
import { UniqueEntityID } from '../../../shared/domain/unique-entity-id'

export class ReviewRepoError extends AppError.UnexpectedError {}

export class ReviewAlreadyExistsError extends ReviewRepoError {
  constructor(reviewId: UniqueEntityID) {
    super(`A Review already exists with ID ${reviewId}`)
  }
}

export abstract class ReviewRepo {
  abstract exists(reviewId: UniqueEntityID): Promise<Result<boolean, ReviewRepoError>>
  abstract upsert(review: Review): Promise<Result<null, ReviewRepoError>>

  async insert(review: Review): Promise<Result<null, ReviewRepoError>> {
    // Prevent clobbering existing reviews
    const exists = await this.exists(review.id)
    if (exists.isErr()) return Result.err(exists.error)
    if (exists.value) return Result.err(new ReviewAlreadyExistsError(review.id))

    return this.upsert(review)
  }
}
