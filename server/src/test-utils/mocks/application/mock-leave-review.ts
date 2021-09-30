import { Place } from '../../../modules/places/domain/entities/place'
import { Review } from '../../../modules/reviews/domain/entities/review'
import { MockReviewRepo } from '../../../modules/reviews/repos/mock-review-repo'
import { LeaveReviewUseCase } from '../../../modules/reviews/use-cases/leave-review/leave-review-use-case'
import { LeaveReviewController } from '../../../modules/reviews/use-cases/leave-review/leave-review-controller'
import { MockPlaceRepo } from '../../../modules/places/repos/mock-place-repo'

export function mockLeaveReview(places: Array<Place>, reviews: Array<Review> = []) {
  const placeRepo = new MockPlaceRepo(places)
  const reviewRepo = new MockReviewRepo(reviews)
  const leaveReviewUseCase = new LeaveReviewUseCase(placeRepo, reviewRepo)
  const leaveReviewController = new LeaveReviewController(leaveReviewUseCase)

  return { placeRepo, reviewRepo, leaveReviewUseCase, leaveReviewController }
}
