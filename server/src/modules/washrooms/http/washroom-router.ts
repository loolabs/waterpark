import { Router } from 'express'
import { GetAllWashroomsController } from '../use-cases/get-all-washrooms/get-all-washrooms-controller'
import { GetWashroomByIdController } from '../use-cases/get-washroom-by-id/get-washroom-by-id-controller'

class WashroomRouter {
  static using(
    getAllWashroomsController: GetAllWashroomsController,
    getWashroomByIdController: GetWashroomByIdController
  ): Router {
    const washroomRouter = Router()
    washroomRouter.get('/washrooms', (req, res) => {
      getAllWashroomsController.execute(req, res)
    })
    washroomRouter.get('/washrooms/:id', (req, res) => {
      getWashroomByIdController.execute(req, res)
    })
    return washroomRouter
  }
}

export { WashroomRouter }
