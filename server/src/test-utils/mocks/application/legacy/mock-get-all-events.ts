import { EventEntity } from '../../../../shared/infra/db/entities/legacy/event.entity'
import { MockEventRepo } from '../../../../modules/legacy/events/infra/repos/implementations/mock-event-repo'
import { GetAllEventsController } from '../../../../modules/legacy/events/application/use-cases/get-all-events/get-all-events-controller'
import { GetAllEventsUseCase } from '../../../../modules/legacy/events/application/use-cases/get-all-events/get-all-events-use-case'

const mockGetAllEvents = (eventEntities: Array<EventEntity> = []) => {
  const eventRepo = new MockEventRepo(eventEntities)
  const getAllEventsUseCase = new GetAllEventsUseCase(eventRepo)
  const getAllEventsController = new GetAllEventsController(getAllEventsUseCase)

  return { eventRepo, getAllEventsUseCase, getAllEventsController }
}

export { mockGetAllEvents }
