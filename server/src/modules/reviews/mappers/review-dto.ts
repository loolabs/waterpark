import * as t from 'io-ts'
import { Faculty, tFaculty, Status, tStatus } from '../domain/entities/review'

interface UserInfoDTO {
  avatarImage: string
  faculty: Faculty
  status: Status
}

interface RatingsDTO {
  affordability?: number
  atmosphere?: number
  cleanliness?: number
  management?: number
}

export interface ReviewDTO {
  reviewId: string
  placeId: string
  comment?: string
  user: UserInfoDTO
  ratings: RatingsDTO
}
export const tReviewDTO: t.Type<ReviewDTO> = t.intersection([
  t.strict({
    reviewId: t.string,
    placeId: t.string,
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
