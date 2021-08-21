import { Washroom } from '../../../../modules/resources/domain/entities/washroom'

const mockWashroom = (id: string): Washroom => {
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

export { mockWashroom }
