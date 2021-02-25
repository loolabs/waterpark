import { MikroEventRepo } from '../../../../infra/repos/implementations/mikro-event-repo'
import { GetAllEventsController } from '../get-all-events-controller'
import { GetAllEventsUseCase } from '../get-all-events-use-case'

export const buildController = (): GetAllEventsController => {
  const fakeMikroUserRepo = new MikroEventRepo()
  const getAllEventsUseCase = new GetAllEventsUseCase(fakeMikroUserRepo)
  const getAllEventsController = new GetAllEventsController(getAllEventsUseCase)

  return getAllEventsController
}
