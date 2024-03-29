import { Review, FacultyEnum, StatusEnum } from '../../../modules/reviews/domain/entities/review'
import { ReviewDTO } from '../../../modules/reviews/mappers/review-dto'
import {
  LeaveReviewBody,
  LeaveReviewParams,
} from '../../../modules/reviews/use-cases/leave-review/leave-review-controller'
import { LeaveReviewArgs } from '../../../modules/reviews/use-cases/leave-review/leave-review-use-case'
import { UniqueEntityID } from '../../../shared/domain/unique-entity-id'
import { PlaceEntity } from '../../../shared/infra/db/entities/places/place.entity'
import { ReviewEntity } from '../../../shared/infra/db/entities/review.entity'

const mockFaculty = FacultyEnum.Mathematics
const mockStatus = StatusEnum.U1

export function mockReview(reviewId: string, placeId: string): Review {
  const reviewResult = Review.create({
    placeId: new UniqueEntityID(placeId),
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

export function mockReviewDTO(reviewId: string, placeId: string): ReviewDTO {
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

export function mockReviewEntity(reviewId: string, placeEntity: PlaceEntity): ReviewEntity {
  return new ReviewEntity({
    reviewId,
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

export function mockLeaveReviewParams(placeId: string): LeaveReviewParams {
  return { placeId }
}

export function mockLeaveReviewBody(reviewId: string): LeaveReviewBody {
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

export function mockLeaveReviewArgs(reviewId: string, placeId: string): LeaveReviewArgs {
  return {
    ...mockLeaveReviewParams(placeId),
    ...mockLeaveReviewBody(reviewId),
  }
}
