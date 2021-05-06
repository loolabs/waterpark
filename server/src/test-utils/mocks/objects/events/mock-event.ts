import { Event } from '../../../../modules/events/domain/entities/event'

const mockEvent = (id: string): Event => {
  const eventResult = Event.create({
    name: `Event Name ${id}`,
    description: `Event Description ${id}`,
    url: `Event URL ${id}`,
    bannerImage: `Banner Image ${id}`,
    startTime: new Date('2021-01-01'),
    endTime: new Date('2021-01-01'),
    links: {
      facebook: `Facebook ${id}`,
      twitter: `Twitter ${id}`,
      instagram: `Instagram ${id}`,
    },
    tags: ['tag1', 'tag2', 'tag3'],
    clubs: [{ name: 'Club Name 1', iconImage: '' }],
  })

  if (eventResult.isErr()) throw eventResult.error
  return eventResult.value
}

export { mockEvent }
