import { Review } from '../domain/entities/review'
import { Result } from '../../../shared/core/result'
import { AppError } from '../../../shared/core/app-error'

export class ReviewRepoError extends AppError.UnexpectedError {}

export class ReviewAlreadyExistsError extends ReviewRepoError {
  constructor(reviewId: string) {
    super(`A Review already exists with ID ${reviewId}`)
  }
}

export class InvalidPlaceIdError extends ReviewRepoError {
  constructor(placeId: string) {
    super(`No place exists with ID ${placeId}`)
  }
}

export abstract class ReviewRepo {
  // abstract exists(reviewId: string): Promise<Result<boolean, ReviewRepoError>>
  abstract insert(review: Review): Promise<Result<null, ReviewRepoError>>
}
