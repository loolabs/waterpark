import { EventDTO } from '../../../../mappers/event-map'

export const createMockEventDTOs = (): Array<EventDTO> => {
  const events: Array<EventDTO> = []
  for (let i = 1; i <= 3; ++i) {
    events.push({
      name: `Event Name ${i}`,
      description: `Event Description ${i}`,
      url: `Event URL ${i}`,
      startTime: '2021-01-01T00:00:00.000Z',
      endTime: '2021-01-01T00:00:00.000Z',
      facebookLink: `Facebook ${i}`,
      twitterLink: `Twitter ${i}`,
      instagramLink: `Instagram ${i}`,
      websiteLink: `Website ${i}`,
      backgroundImageURL: `Background URL ${i}`,
      tags: ['tag1', 'tag2', 'tag3'],
      clubs: [{ name: 'Club Name 1', iconURL: '' }],
    })
  }
  return events
}
