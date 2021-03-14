import { EventDTO } from '../../../../mappers/event-dto'

const createMockEventDTO = (id: any): EventDTO => {
  return {
    name: `Event Name ${id}`,
    description: `Event Description ${id}`,
  }
}

export { createMockEventDTO }
