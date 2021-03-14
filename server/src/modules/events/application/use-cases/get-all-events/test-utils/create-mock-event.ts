import { Event } from '../../../../domain/entities/event'

const createMockEvent = (id: any): Event => {
  const eventResult = Event.create({
    name: `Event Name ${id}`,
    description: `Event Description ${id}`,
  })

  if (eventResult.isErr()) throw eventResult.error
  return eventResult.value
}

export { createMockEvent }
