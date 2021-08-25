import { Review, Faculty, Status } from '../../../modules/reviews/domain/entities/review'
import { ReviewDTO } from '../../../modules/reviews/mappers/review-dto'
import {
  LeaveReviewBody,
  LeaveReviewParams,
} from '../../../modules/reviews/use-cases/leave-review/leave-review-controller'
import { LeaveReviewArgs } from '../../../modules/reviews/use-cases/leave-review/leave-review-use-case'
import { PlaceEntity } from '../../../shared/infra/db/entities/places/place.entity'
import { ReviewEntity } from '../../../shared/infra/db/entities/review.entity'

const mockFaculty = Faculty.Mathematics
const mockStatus = Status.U1

export const mockReview = (reviewId: string, placeId: string): Review => {
  const reviewResult = Review.create({
    placeId: placeId,
    comment: `Comment ${reviewId}`,
    user: {
      avatarImage: `Avatar Image ${reviewId}`,
      faculty: mockFaculty,
      status: mockStatus,
    },
    ratings: {
      affordability: 0,
      cleanliness: 1,
      management: 2,
    },
  })

  if (reviewResult.isErr()) throw reviewResult.error
  return reviewResult.value
}

export const mockReviewDTO = (reviewId: string, placeId: string): ReviewDTO => {
  return {
    reviewId: reviewId,
    placeId: placeId,
    comment: `Comment ${reviewId}`,
    user: {
      avatarImage: `Avatar Image ${reviewId}`,
      faculty: mockFaculty,
      status: mockStatus,
    },
    ratings: {
      atmosphere: 0,
      cleanliness: 1,
      management: 2,
    },
  }
}

export const mockReviewEntity = (reviewId: string, placeEntity: PlaceEntity): ReviewEntity => {
  return new ReviewEntity({
    place: placeEntity,
    comment: `Comment ${reviewId}`,
    user: {
      avatarImage: `Avatar Image ${reviewId}`,
      faculty: mockFaculty,
      status: mockStatus,
    },
    ratings: {
      atmosphere: 0,
      cleanliness: 1,
      management: 2,
    },
  })
}

export const mockLeaveReviewParams = (placeId: string): LeaveReviewParams => {
  return { placeId }
}

export const mockLeaveReviewBody = (reviewId: string): LeaveReviewBody => {
  return {
    comment: `Comment ${reviewId}`,
    user: {
      avatarImage: `Avatar Image ${reviewId}`,
      faculty: mockFaculty,
      status: mockStatus,
    },
    ratings: {
      atmosphere: 0,
      cleanliness: 1,
      management: 2,
    },
  }
}

export const mockLeaveReviewArgs = (reviewId: string, placeId: string): LeaveReviewArgs => {
  return {
    ...mockLeaveReviewParams(placeId),
    ...mockLeaveReviewBody(reviewId),
  }
}
