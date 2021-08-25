import { z } from 'zod'
import { Faculty, Status } from '../domain/entities/review'

export const ReviewDTO = z.strictObject({
  reviewId: z.string(),
  placeId: z.string(),
  comment: z.string().optional(),
  user: z.strictObject({
    avatarImage: z.string(),
    faculty: Faculty,
    status: Status,
  }),
  ratings: z.strictObject({
    affordability: z.number().optional(),
    atmosphere: z.number().optional(),
    cleanliness: z.number().optional(),
    management: z.number().optional(),
  }),
})
export type ReviewDTO = z.infer<typeof ReviewDTO>
