import { mikroEventRepo } from '../../../infra/repos'
import { GetAllEventsController } from './get-all-events-controller'
import { GetAllEventsUseCase } from './get-all-events-use-case'

const getAllEventsUseCase = new GetAllEventsUseCase(mikroEventRepo)
const getAllEventsController = new GetAllEventsController(getAllEventsUseCase)

export { getAllEventsController, getAllEventsUseCase }
