import { AppError } from '../../../../../shared/core/app-error'
import { Result } from '../../../../../shared/core/result'
import { mocks } from '../../../../../test-utils'
import { PlaceRepo } from '../../../../places/repos/place-repo'
import { ReviewRepo, ReviewRepoError } from '../../../repos/review-repo'
import { LeaveReviewUseCase, LeaveReviewArgs, InvalidPlaceIdError } from '../leave-review-use-case'

const reviewId = '1'
const placeId = '1'

describe('LeaveReviewUseCase', () => {
  let leaveReviewArgs: LeaveReviewArgs
  let placeRepo: PlaceRepo
  let reviewRepo: ReviewRepo
  let leaveReviewUseCase: LeaveReviewUseCase

  beforeAll(async () => {
    const place = mocks.mockPlace(placeId)
    const leaveReview = await mocks.mockLeaveReview([place])
    placeRepo = leaveReview.placeRepo
    reviewRepo = leaveReview.reviewRepo
    leaveReviewUseCase = leaveReview.leaveReviewUseCase
  })

  beforeEach(() => {
    leaveReviewArgs = mocks.mockLeaveReviewArgs(reviewId, placeId)
  })

  test('When executed with valid args, should insert the review and return an Ok', async () => {
    jest.spyOn(placeRepo, 'exists').mockResolvedValue(Result.ok(true))
    jest.spyOn(reviewRepo, 'insert').mockResolvedValue(Result.ok(null))

    const createUserResult = await leaveReviewUseCase.execute(leaveReviewArgs)

    expect(reviewRepo.insert).toBeCalled()
    expect(createUserResult.isOk()).toBe(true)
  })

  test('When the place ID does not exist, should return an InvalidPlaceIdError', async () => {
    jest.spyOn(placeRepo, 'exists').mockResolvedValue(Result.ok(false))

    const createUserResult = await leaveReviewUseCase.execute(leaveReviewArgs)

    expect(reviewRepo.insert).toBeCalled()
    expect(createUserResult.isErr()).toBe(true)
    if (!createUserResult.isErr()) return // type guard
    expect(createUserResult.error instanceof InvalidPlaceIdError)
  })

  test('When place repo returns an error, should return LeaveReviewError', async () => {
    jest
      .spyOn(placeRepo, 'exists')
      .mockResolvedValue(Result.err(new AppError.UnexpectedError('Pretend something failed.')))

    const leaveReviewResult = await leaveReviewUseCase.execute(leaveReviewArgs)

    expect(leaveReviewResult.isErr()).toBe(true)
  })

  test('When review repo returns an error, should return LeaveReviewError', async () => {
    jest.spyOn(placeRepo, 'exists').mockResolvedValue(Result.ok(true))
    jest
      .spyOn(reviewRepo, 'insert')
      .mockResolvedValue(Result.err(new ReviewRepoError('Pretend something failed.')))

    const leaveReviewResult = await leaveReviewUseCase.execute(leaveReviewArgs)

    expect(leaveReviewResult.isErr()).toBe(true)
  })
})
