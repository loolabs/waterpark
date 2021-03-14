import { EventEntity } from '../../../../../../shared/infra/db/entities/event.entity'
import { MockEventRepo } from '../../../../infra/repos/implementations/mock-event-repo'
import { GetAllEventsController } from '../get-all-events-controller'
import { GetAllEventsUseCase } from '../get-all-events-use-case'

const setup = (eventEntities: Array<EventEntity> = []) => {
  const eventRepo = new MockEventRepo(eventEntities)
  const getAllEventsUseCase = new GetAllEventsUseCase(eventRepo)
  const getAllEventsController = new GetAllEventsController(getAllEventsUseCase)

  return { eventRepo, getAllEventsUseCase, getAllEventsController }
}

export { setup }
