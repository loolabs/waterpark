import { Club } from '../../../../modules/clubs/domain/entities/club'

const mockClub = (id: string): Club => {
  const clubResult = Club.create({
    name: `Club Name ${id}`,
    description: `Club Description ${id}`,
    bannerImage: `Club Banner ${id}`,
    iconImage: `Club Icon ${id}`,
    links: {
      facebook: `Facebook ${id}`,
      twitter: `Twitter ${id}`,
      instagram: `Instagram ${id}`,
      website: `Website ${id}`,
    },
    tags: ['tag1', 'tag2', 'tag3'],
    events: [
      {
        name: 'Event Name 1',
        startTime: new Date('2021-01-01'),
        endTime: new Date('2021-01-01'),
        bannerImage: 'Event Banner',
        tags: ['tags'],
      },
    ],
  })

  if (clubResult.isErr()) throw clubResult.error
  return clubResult.value
}

export { mockClub }
