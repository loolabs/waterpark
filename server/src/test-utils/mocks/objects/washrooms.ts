import { mockPlaceEntity } from './places'
import { Washroom } from '../../../modules/resources/domain/entities/washroom'
import { WashroomDTO } from '../../../modules/resources/mappers/washroom-dto'
import { WashroomEntity } from '../../../shared/infra/db/entities/places/washroom.entity'

export const mockWashroom = (id: string): Washroom => {
  const washroomResult = Washroom.create({
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

  if (washroomResult.isErr()) throw washroomResult.error
  return washroomResult.value
}

export const mockWashroomDTO = (id: string): WashroomDTO => {
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

export const mockWashroomEntity = (id: string): WashroomEntity => {
  const washroomEntity = new WashroomEntity(mockPlaceEntity(id))
  return washroomEntity
}
