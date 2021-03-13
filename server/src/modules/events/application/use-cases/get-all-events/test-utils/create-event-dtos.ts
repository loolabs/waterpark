import { EventDTO } from '../../../../mappers/event-dto'

export const createMockEventDTOs = (): Array<EventDTO> => {
  const events: Array<EventDTO> = []
  for (let i = 1; i <= 3; ++i) {
    events.push({
      name: `Event Name ${i}`,
      description: `Event Description ${i}`,
      url: `Event URL ${i}`,
      startTime: 'Fri, 01 Jan 2021 00:00:00 GMT',
      endTime: 'Fri, 01 Jan 2021 00:00:00 GMT',
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
