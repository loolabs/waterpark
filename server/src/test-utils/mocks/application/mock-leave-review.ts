import { Review } from '../../../modules/reviews/domain/entities/review'
import { MockReviewRepo } from '../../../modules/reviews/repos/mock-review-repo'
import { LeaveReviewUseCase } from '../../../modules/reviews/use-cases/leave-review/leave-review-use-case'
import { LeaveReviewController } from '../../../modules/reviews/use-cases/leave-review/leave-review-controller'

const mockLeaveReview = async (placeIds: Array<string>, reviews: Array<Review> = []) => {
  const reviewRepo = new MockReviewRepo(placeIds, reviews)
  const leaveReviewUseCase = new LeaveReviewUseCase(reviewRepo)
  const leaveReviewController = new LeaveReviewController(leaveReviewUseCase)

  return { reviewRepo, leaveReviewUseCase, leaveReviewController }
}

export { mockLeaveReview }
