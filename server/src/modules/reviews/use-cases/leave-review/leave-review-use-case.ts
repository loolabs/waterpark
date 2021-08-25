import { UseCaseWithDTO } from '../../../../shared/app/use-case-with-dto'
import { AppError } from '../../../../shared/core/app-error'
import { Result } from '../../../../shared/core/result'
import { Review } from '../../domain/entities/review'
import { ReviewDTO } from '../../mappers/review-dto'
import { ReviewMap } from '../../mappers/review-map'
import { ReviewRepo } from '../../repos/review-repo'

export class LeaveReviewError extends AppError.UnexpectedError {
  constructor(message: string) {
    super(message)
  }
}
export type LeaveReviewArgs = Omit<ReviewDTO, 'reviewId'>
export type LeaveReviewResult = Result<Review, LeaveReviewError>

export class LeaveReviewUseCase implements UseCaseWithDTO<LeaveReviewArgs, LeaveReviewResult> {
  constructor(protected reviewRepo: ReviewRepo) {}

  async execute(args: LeaveReviewArgs): Promise<LeaveReviewResult> {
    const reviewResult = ReviewMap.fromDTO(args)
    if (reviewResult.isErr()) return Result.err(reviewResult.error)
    const review = reviewResult.value

    const insertResult = await this.reviewRepo.insert(review)
    if (insertResult.isErr()) return Result.err(insertResult.error)

    return Result.ok(review)
  }
}
