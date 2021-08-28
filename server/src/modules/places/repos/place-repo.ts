import { Place } from '../domain/entities/place'
import { Result } from '../../../shared/core/result'
import { AppError } from '../../../shared/core/app-error'
import { UniqueEntityID } from '../../../shared/domain/unique-entity-id'

export interface PlaceOptions {
  mustIncludeReviews?: true // if set, the returned places must include reviews
}

// TODO: PlaceRepo custom errors

export abstract class PlaceRepo {
  // TODO: perhaps rename this to getAll
  abstract getAllPlaces(
    options?: PlaceOptions
  ): Promise<Result<Array<Place>, AppError.UnexpectedError>>

  abstract exists(placeId: UniqueEntityID): Promise<Result<boolean, AppError.UnexpectedError>>
}
