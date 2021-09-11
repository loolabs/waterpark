import { Router } from 'express'
import { GetAllPlacesController } from '../use-cases/get-all-places/get-all-places-controller'

export class PlaceRouter {
  static using(getAllPlacesController: GetAllPlacesController): Router {
    const placeRouter = Router()
    placeRouter.get('/', (req, res) => {
      getAllPlacesController.execute(req, res)
    })
    return placeRouter
  }
}
