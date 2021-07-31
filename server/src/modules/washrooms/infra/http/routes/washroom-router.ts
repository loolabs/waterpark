import { Router } from 'express'
import { GetAllWashroomsController } from '../../../application/use-cases/get-all-washrooms/get-all-washrooms-controller';

class WashroomRouter {
  static using(getAllWashroomsController: GetAllWashroomsController): Router {
    const washroomRouter = Router()
    washroomRouter.get('/washrooms', (req, res) => {
      getAllWashroomsController.execute(req, res)
    })
    return washroomRouter
  }
}

export { WashroomRouter }
