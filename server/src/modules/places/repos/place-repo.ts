import { Place } from '../domain/entities/place'
import { Result } from '../../../shared/core/result'
import { AppError } from '../../../shared/core/app-error'

export interface PlaceOptions {
  mustIncludeReviews?: true // if set, the returned places must include reviews
}

export abstract class PlaceRepo {
  abstract getAllPlaces(
    options?: PlaceOptions
  ): Promise<Result<Array<Place>, AppError.UnexpectedError>>
}
