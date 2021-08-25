import { Result } from '../../../../../shared/core/result'
import { mocks } from '../../../../../test-utils'
import { ReviewRepo, InvalidPlaceIdError, ReviewRepoError } from '../../../repos/review-repo'
import { LeaveReviewUseCase, LeaveReviewArgs } from '../leave-review-use-case'

jest.mock('../../../repos/mock-review-repo')

const reviewId = '1'
const placeId = '1'

describe('LeaveReviewUseCase', () => {
  let leaveReviewArgs: LeaveReviewArgs
  let reviewRepo: ReviewRepo
  let leaveReviewUseCase: LeaveReviewUseCase

  beforeAll(async () => {
    const leaveReview = await mocks.mockLeaveReview([placeId])
    reviewRepo = leaveReview.reviewRepo
    leaveReviewUseCase = leaveReview.leaveReviewUseCase
  })

  beforeEach(() => {
    leaveReviewArgs = mocks.mockLeaveReviewArgs(reviewId, placeId)
  })

  test('When executed with valid args, should insert the review and return an Ok', async () => {
    jest.spyOn(reviewRepo, 'insert').mockResolvedValue(Result.ok(null))

    const createUserResult = await leaveReviewUseCase.execute(leaveReviewArgs)

    expect(reviewRepo.insert).toBeCalled()
    expect(createUserResult.isOk()).toBe(true)
  })

  test('When repo throws error, should return LeaveReviewError', async () => {
    jest
      .spyOn(reviewRepo, 'insert')
      .mockResolvedValue(Result.err(new ReviewRepoError('Pretend something failed.')))

    const leaveReviewResult = await leaveReviewUseCase.execute(leaveReviewArgs)

    expect(reviewRepo.insert).toBeCalled()
    expect(leaveReviewResult.isErr()).toBe(true)
  })
})
