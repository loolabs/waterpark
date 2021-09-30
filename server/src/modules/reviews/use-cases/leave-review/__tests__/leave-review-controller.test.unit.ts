import { mocks } from '../../../../../test-utils'
import { Result } from '../../../../../shared/core/result'
import {
  LeaveReviewBody,
  LeaveReviewController,
  LeaveReviewParams,
} from '../leave-review-controller'
import { LeaveReviewUseCase, LeaveReviewError } from '../leave-review-use-case'

const reviewId = '1'
const placeId = '1'

describe('LeaveReviewController', () => {
  const params: LeaveReviewParams = mocks.mockLeaveReviewParams(placeId)
  const body: LeaveReviewBody = mocks.mockLeaveReviewBody(reviewId)

  let leaveReviewUseCase: LeaveReviewUseCase
  let leaveReviewController: LeaveReviewController
  beforeAll(async () => {
    const place = mocks.mockPlace(placeId)
    const leaveReview = await mocks.mockLeaveReview([place])
    leaveReviewUseCase = leaveReview.leaveReviewUseCase
    leaveReviewController = leaveReview.leaveReviewController
  })

  test('When the use case returns Ok, the controller returns 200 OK', async () => {
    const review = mocks.mockReview(reviewId, placeId)
    jest.spyOn(leaveReviewUseCase, 'execute').mockImplementation(async (_) => Result.ok(review))

    const { req, res } = mocks.mockHandlerParams({ request: { body, params } })
    await leaveReviewController.execute(req, res)
    expect(res.statusCode).toBe(200)
  })

  test('When the request body is invalid, the controller returns 400 Bad Request', async () => {
    const invalidBody = Object.assign({}, body) as any // shallow copy
    invalidBody.user = 42

    const { req, res } = mocks.mockHandlerParams({ request: { body: invalidBody, params } })
    await leaveReviewController.execute(req, res)
    expect(res.statusCode).toBe(400)
  })

  test('When the use case returns LeaveReviewError, the controller returns 500 Internal Server Error', async () => {
    jest
      .spyOn(leaveReviewUseCase, 'execute')
      .mockImplementation(async (_) => Result.err(new LeaveReviewError('Pretend something failed')))

    const { req, res } = mocks.mockHandlerParams({ request: { body, params } })
    await leaveReviewController.execute(req, res)
    expect(res.statusCode).toBe(500)
  })
})
