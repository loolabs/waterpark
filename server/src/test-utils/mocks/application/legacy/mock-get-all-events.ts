import { Event } from '../../../../modules/legacy/events/domain/entities/event'
import { MockEventRepo } from '../../../../modules/legacy/events/infra/repos/implementations/mock-event-repo'
import { GetAllEventsController } from '../../../../modules/legacy/events/application/use-cases/get-all-events/get-all-events-controller'
import { GetAllEventsUseCase } from '../../../../modules/legacy/events/application/use-cases/get-all-events/get-all-events-use-case'

export function mockGetAllEvents(events: Array<Event> = []) {
  const eventRepo = new MockEventRepo(events)
  const getAllEventsUseCase = new GetAllEventsUseCase(eventRepo)
  const getAllEventsController = new GetAllEventsController(getAllEventsUseCase)

  return { eventRepo, getAllEventsUseCase, getAllEventsController }
}
