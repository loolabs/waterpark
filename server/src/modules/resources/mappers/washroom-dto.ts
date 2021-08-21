import { PlaceDTO } from '../../places/mappers/place-dto'

export interface WashroomDTO extends PlaceDTO {}

export interface WashroomDetailDTO extends WashroomDTO {
  reviews: unknown // TODO
}
