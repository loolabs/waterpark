import { ClubDTO } from '../../../../../modules/legacy/clubs/mappers/club-dto'

const mockClubDTO = (id: string): ClubDTO => {
  return {
    id: id,
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
        id: id,
        name: 'Event Name 1',
        startTime: '2021-01-01T00:00:00.000Z',
        endTime: '2021-01-01T00:00:00.000Z',
        bannerImage: 'Event Banner',
        tags: ['tags'],
      },
    ],
  }
}

export { mockClubDTO }
