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
      ...review.props,
      reviewId: review.id.toString(),
      placeId: review.placeId.toString(),
    }
  }

  public static fromDTO(reviewDTO: Omit<ReviewDTO, 'reviewId'>): Result<Review, Error> {
    return Review.create({ ...reviewDTO, placeId: new UniqueEntityID(reviewDTO.placeId) })
  }

  public static fromMikro(reviewEntity: ReviewEntity): Review {
    const reviewResult = Review.create(
      {
        placeId: new UniqueEntityID(reviewEntity.place.id),
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
    return new ReviewEntity({
      reviewId: review.id.toString(),
      place: placesEntityRepo.getReference(review.placeId.toString()),
      comment: review.comment,
      user: review.user,
      ratings: review.ratings,
    })
  }
}
