import * as t from 'io-ts'
import express from 'express'
import { LeaveReviewUseCase, LeaveReviewArgs, LeaveReviewResult } from './leave-review-use-case'
import { tFaculty, tStatus } from '../../domain/entities/review'
import { TypedController } from '../../../../shared/app/typed-controller'
import { Result } from '../../../../shared/core/result'
import { ReviewMap } from '../../mappers/review-map'

// TODO: factor these types out when API types land

export type LeaveReviewBody = Omit<LeaveReviewArgs, 'placeId'>
export const tLeaveReviewBody: t.Type<LeaveReviewBody> = t.intersection([
  t.strict({
    user: t.strict({
      avatarImage: t.string,
      faculty: tFaculty,
      status: tStatus,
    }),
    ratings: t.partial({
      affordability: t.number,
      atmosphere: t.number,
      cleanliness: t.number,
      management: t.number,
    }),
  }),
  t.partial({
    comment: t.string,
  }),
])

export type LeaveReviewParams = {
  placeId: string
}
export const tLeaveReviewParams: t.Type<LeaveReviewParams> = t.strict({
  placeId: t.string,
})

export class LeaveReviewController extends TypedController<LeaveReviewUseCase> {
  buildArgs(req: express.Request): Result<LeaveReviewArgs, t.Errors> {
    const paramsResult = this.validate(req.params, tLeaveReviewParams)
    const bodyResult = this.validate(req.body, tLeaveReviewBody)
    if (paramsResult.isOk() && bodyResult.isOk()) {
      return Result.ok({
        ...paramsResult.value,
        ...bodyResult.value,
      })
    }
    const errors: t.Errors = []
    if (paramsResult.isErr()) errors.push(...paramsResult.error)
    if (bodyResult.isErr()) errors.push(...bodyResult.error)
    return Result.err(errors)
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
