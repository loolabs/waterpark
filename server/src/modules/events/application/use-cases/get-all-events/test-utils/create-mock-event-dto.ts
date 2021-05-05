import { EventDTO } from '../../../../mappers/event-dto'

const createMockEventDTO = (id: any): EventDTO => {
  return {
    name: `Event Name ${id}`,
    description: `Event Description ${id}`,
    links: {
      url: `Event URL ${id}`,
      bannerImage: `Banner Image ${id}`,
      facebook: `Facebook ${id}`,
      twitter: `Twitter ${id}`,
      instagram: `Instagram ${id}`,
    },
    startTime: '2021-01-01T00:00:00.000Z',
    endTime: '2021-01-01T00:00:00.000Z',
    tags: ['tag1', 'tag2', 'tag3'],
    clubs: [{ name: 'Club Name 1', iconImage: '' }],
  }
}

export { createMockEventDTO }
