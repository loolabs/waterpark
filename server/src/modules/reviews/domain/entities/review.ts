import { z } from 'zod'
import { UniqueEntityID } from '../../../../shared/domain/unique-entity-id'
import { Result } from '../../../../shared/core/result'
import { AggregateRoot } from '../../../../shared/domain/aggregate-root'
import { ReviewCreated } from '../events/review-created'

// FacultyEnum and StatusEnum are string enums, so they are somewhere between a
//   type and a variable. To keep things clear, we export Faculty and Status as
//   the canonical type + validator objects.
// If you're confused how we export two identifiers with the same name, see
//   https://stackoverflow.com/a/49798480

export enum FacultyEnum {
  Mathematics = 'Mathematics',
  Engineering = 'Engineering',
  Arts = 'Arts',
  Health = 'Health',
  Science = 'Science',
  Environment = 'Environment',
  NonWaterloo = 'Non-Waterloo',
}
export const Faculty = z.nativeEnum(FacultyEnum)
export type Faculty = z.infer<typeof Faculty>

export enum StatusEnum {
  U1 = 'First-Year Student',
  U2 = 'Second-Year Student',
  U3 = 'Third-Year Student',
  U4 = 'Fourth-Year Student',
  U5 = 'Fifth-Year Student',
  U6Plus = 'Sixth-Year+ Student',
  Masters = "Master's Student",
  PhD = 'PhD Student',
  Faculty = 'Faculty Member',
  Other = 'Reviewer',
}
export const Status = z.nativeEnum(StatusEnum)
export type Status = z.infer<typeof Status>

interface UserInfo {
  avatarImage: string
  faculty: Faculty
  status: Status
}

interface Ratings {
  affordability?: number
  atmosphere?: number
  cleanliness?: number
  management?: number
}

interface ReviewProps {
  placeId: string
  comment?: string
  user: UserInfo
  ratings: Ratings
}

export class Review extends AggregateRoot<ReviewProps> {
  public static create(props: ReviewProps, id?: UniqueEntityID): Result<Review, Error> {
    const isNew = id === undefined
    const review = new Review(
      {
        ...props,
      },
      id
    )

    if (isNew) review.addDomainEvent(new ReviewCreated(review))

    return Result.ok(review)
  }

  private constructor(props: ReviewProps, id?: UniqueEntityID) {
    super(props, id)
  }

  get placeId(): string {
    return this.props.placeId
  }

  get comment(): string | undefined {
    return this.props.comment
  }

  get user(): UserInfo {
    return this.props.user
  }

  get ratings(): Ratings {
    return this.props.ratings
  }
}
