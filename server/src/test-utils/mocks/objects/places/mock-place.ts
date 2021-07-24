import { Place } from '../../../../modules/places/domain/entities/place'

const mockPlace = (id: string): Place => {
  const placeResult = Place.create(
    {
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
  )

  if (placeResult.isErr()) throw placeResult.error
  return placeResult.value
}

export { mockPlace }
