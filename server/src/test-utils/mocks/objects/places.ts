import { Place } from '../../../modules/places/domain/entities/place'
import { PlaceDTO } from '../../../modules/places/mappers/place-dto'
import { PlaceEntity } from '../../../shared/infra/db/entities/places/place.entity'

export function mockPlace(id: string): Place {
  const placeResult = Place.create({
    name: `Place Name ${id}`,
    description: `Place Description ${id}`,
    address: `Place Address ${id}`,
    onCampus: true,
    links: {
      url: `Place URL ${id}`,
      bannerImage: `Place Banner ${id}`,
      iconImage: `Place Icon ${id}`,
    },
    tags: ['tag 1', 'tag 2', 'tag 3'],
  })

  if (placeResult.isErr()) throw placeResult.error
  return placeResult.value
}

export function mockPlaceDTO(id: string): PlaceDTO {
  return {
    name: `Place Name ${id}`,
    description: `Place Description ${id}`,
    address: `Place Address ${id}`,
    onCampus: true,
    links: {
      url: `Place URL ${id}`,
      bannerImage: `Place Banner ${id}`,
      iconImage: `Place Icon ${id}`,
    },
    tags: ['tag 1', 'tag 2', 'tag 3'],
  }
}

export function mockPlaceEntity(id: string): PlaceEntity {
  const placeEntity = new PlaceEntity()
  placeEntity.name = `Place Name ${id}`
  placeEntity.description = `Place Description ${id}`
  placeEntity.address = `Place Address ${id}`
  placeEntity.url = `Place URL ${id}`
  placeEntity.onCampus = true
  placeEntity.bannerImage = `Place Banner ${id}`
  placeEntity.iconImage = `Place Icon ${id}`
  return placeEntity
}
