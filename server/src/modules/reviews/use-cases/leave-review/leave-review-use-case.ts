import { z } from 'zod'
import { UseCaseWithDTO } from '../../../../shared/app/use-case-with-dto'
import { AppError } from '../../../../shared/core/app-error'
import { Result } from '../../../../shared/core/result'
import { UniqueEntityID } from '../../../../shared/domain/unique-entity-id'
import { PlaceRepo } from '../../../places/repos/place-repo'
import { Review } from '../../domain/entities/review'
import { ReviewDTO } from '../../mappers/review-dto'
import { ReviewMap } from '../../mappers/review-map'
import { ReviewRepo } from '../../repos/review-repo'

export const LeaveReviewArgs = ReviewDTO.omit({ reviewId: true })
export type LeaveReviewArgs = z.infer<typeof LeaveReviewArgs>

export class LeaveReviewError extends AppError.UnexpectedError {}
export class InvalidPlaceIdError extends LeaveReviewError {
  constructor(placeId: UniqueEntityID) {
    super(`${placeId} is not a valid place ID`)
  }
}

export type LeaveReviewResult = Result<Review, LeaveReviewError>

// TODO: decouple DTO from API arguments
export class LeaveReviewUseCase implements UseCaseWithDTO<LeaveReviewArgs, LeaveReviewResult> {
  constructor(protected placeRepo: PlaceRepo, protected reviewRepo: ReviewRepo) {}

  async execute(args: LeaveReviewArgs): Promise<LeaveReviewResult> {
    // Check that the review refers to a valid place
    const placeId = new UniqueEntityID(args.placeId)
    const placeExistsResult = await this.placeRepo.exists(placeId)
    if (placeExistsResult.isErr()) return Result.err(placeExistsResult.error)
    if (!placeExistsResult.value) return Result.err(new InvalidPlaceIdError(placeId))

    const reviewResult = ReviewMap.fromDTO(args)
    if (reviewResult.isErr()) return Result.err(reviewResult.error)
    const review = reviewResult.value

    const insertResult = await this.reviewRepo.insert(review)
    if (insertResult.isErr()) return Result.err(insertResult.error)

    return Result.ok(review)
  }
}
