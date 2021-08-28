import { Place } from '../domain/entities/place'
import { PlaceRepo, PlaceOptions } from './place-repo'
import { Result } from '../../../shared/core/result'
import { AppError } from '../../../shared/core/app-error'
import { UniqueEntityID } from '../../../shared/domain/unique-entity-id'

export class MockPlaceRepo implements PlaceRepo {
  protected places: Array<Place>
  protected placesById: Map<UniqueEntityID, Place>

  constructor(places: Array<Place> = []) {
    this.places = places
    this.placesById = new Map(places.map((place) => [place.id, place]))
  }

  async getAllPlaces(
    _options: PlaceOptions = {}
  ): Promise<Result<Array<Place>, AppError.UnexpectedError>> {
    return Result.ok(this.places)
  }

  async exists(placeId: UniqueEntityID): Promise<Result<boolean, AppError.UnexpectedError>> {
    return Result.ok(this.placesById.has(placeId))
  }
}
