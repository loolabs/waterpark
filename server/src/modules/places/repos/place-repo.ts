import { Place } from '../domain/entities/place'
import { Result } from '../../../shared/core/result'
import { AppError } from '../../../shared/core/app-error'

export abstract class PlaceRepo {
  abstract getAllPlaces(): Promise<Result<Array<Place>, AppError.UnexpectedError>>
}
