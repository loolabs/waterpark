import { EventDTO } from '../../../../modules/legacy/events/mappers/event-dto'

const mockEventDTO = (id: string): EventDTO => {
  return {
    id: id,
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
    clubs: [{ id: id, name: 'Club Name 1', iconImage: '' }],
  }
}

export { mockEventDTO }
