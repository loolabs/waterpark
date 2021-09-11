import { Router } from 'express'
import { GetAllEventsController } from '../../../application/use-cases/get-all-events/get-all-events-controller'

export class EventRouter {
  static using(getAllEventsController: GetAllEventsController): Router {
    const eventRouter = Router()
    eventRouter.get('/', (req, res) => {
      getAllEventsController.execute(req, res)
    })
    return eventRouter
  }
}
