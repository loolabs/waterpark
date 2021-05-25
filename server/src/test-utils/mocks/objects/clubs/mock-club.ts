import { Club } from '../../../../modules/clubs/domain/entities/club'
import { UniqueEntityID } from '../../../../shared/domain/unique-entity-id'
const mockClub = (id: string): Club => {
  const clubResult = Club.create(
    {
      name: `Club Name ${id}`,
      description: `Club Description ${id}`,
      size: 30,
      links: {
        bannerImage: `Club Banner ${id}`,
        iconImage: `Club Icon ${id}`,
        facebook: `Facebook ${id}`,
        twitter: `Twitter ${id}`,
        instagram: `Instagram ${id}`,
        website: `Website ${id}`,
      },
      tags: ['tag1', 'tag2', 'tag3'],
      events: [
        {
          id: new UniqueEntityID(id),
          name: 'Event Name 1',
          startTime: new Date('2021-01-01'),
          endTime: new Date('2021-01-01'),
          bannerImage: 'Event Banner',
          tags: ['tags'],
        },
      ],
    },
    new UniqueEntityID(id)
  )

  if (clubResult.isErr()) throw clubResult.error
  return clubResult.value
}

export { mockClub }
