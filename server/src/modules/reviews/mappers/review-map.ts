import { EntityRepository } from '@mikro-orm/core'
import { Result } from '../../../shared/core/result'
import { UniqueEntityID } from '../../../shared/domain/unique-entity-id'
import { PlaceEntity } from '../../../shared/infra/db/entities/places/place.entity'
import { ReviewEntity } from '../../../shared/infra/db/entities/review.entity'
import { Review } from '../domain/entities/review'
import { ReviewDTO } from './review-dto'

export class ReviewMap {
  public static toDTO(review: Review): ReviewDTO {
    return {
      reviewId: review.id.toString(),
      ...review.props,
    }
  }

  public static fromDTO(reviewDTO: Omit<ReviewDTO, 'reviewId'>): Result<Review, Error> {
    return Review.create({ ...reviewDTO })
  }

  public static fromMikro(reviewEntity: ReviewEntity): Review {
    const reviewResult = Review.create(
      {
        placeId: reviewEntity.place.id,
        comment: reviewEntity.comment,
        user: {
          avatarImage: reviewEntity.avatarImage,
          faculty: reviewEntity.faculty,
          status: reviewEntity.status,
        },
        ratings: {
          affordability: reviewEntity.affordabilityRating,
          atmosphere: reviewEntity.atmosphereRating,
          cleanliness: reviewEntity.cleanlinessRating,
          management: reviewEntity.managementRating,
        },
      },
      new UniqueEntityID(reviewEntity.id)
    )
    if (reviewResult.isErr()) throw new Error() // TODO: error handling

    return reviewResult.value
  }

  public static async toMikro(
    review: Review,
    placesEntityRepo: EntityRepository<PlaceEntity>
  ): Promise<ReviewEntity> {
    // The domain Review generates an ID for itself upon creation.
    // This makes no sense if we create the domain Review with the purpose of
    //   persisting it for the first time via a toPersistence call.
    // For example, UniqueEntityID has no concept of what IDs are available, so
    //   it could create a duplicate ID that interferes with persistence.
    // Thus, in this function we assume that all reviews are brand new, and that
    //   their ID fields are garbage. We do not carry the ID value over to the
    //   resulting entity.
    // TODO: the proper fix is to change the way AggregateRoot works.

    const props = {
      place: placesEntityRepo.getReference(review.placeId),
      comment: review.comment,
      user: review.user,
      ratings: review.ratings,
    }
    const reviewEntity = new ReviewEntity(props)
    return reviewEntity
  }
}
