import { z } from 'zod'
import express from 'express'
import { LeaveReviewUseCase, LeaveReviewArgs, LeaveReviewResult } from './leave-review-use-case'
import { TypedController } from '../../../../shared/app/typed-controller'
import { Result } from '../../../../shared/core/result'
import { ReviewMap } from '../../mappers/review-map'
import { ValidationError, merge } from '../../../../shared/core/validation'

// TODO: factor these types out when API types land

export const LeaveReviewParams = LeaveReviewArgs.pick({ placeId: true })
export type LeaveReviewParams = z.infer<typeof LeaveReviewParams>

export const LeaveReviewBody = LeaveReviewArgs.omit({ placeId: true })
export type LeaveReviewBody = z.infer<typeof LeaveReviewBody>

export class LeaveReviewController extends TypedController<LeaveReviewUseCase> {
  buildArgs(req: express.Request): Result<LeaveReviewArgs, ValidationError> {
    return merge(
      this.validate(req.params, LeaveReviewParams),
      this.validate(req.body, LeaveReviewBody)
    )
  }

  async onResult<Res extends express.Response>(
    _: express.Request,
    res: Res,
    result: LeaveReviewResult
  ): Promise<Res> {
    if (result.isOk()) {
      const review = result.value
      return this.ok(res, ReviewMap.toDTO(review))
    }
    // TODO: proper error discrimination
    return this.fail(res, result.error)
  }
}
