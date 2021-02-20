import { EventDTO } from '../../../../mappers/event-dto'

export const createMockEventDTOs = (): Array<EventDTO> => {
  const events: Array<EventDTO> = []
  for (let i = 1; i <= 3; ++i) {
    events.push({
      name: `Event Name ${i}`,
      description: `Event Description ${i}`,
    })
  }
  return events
}
