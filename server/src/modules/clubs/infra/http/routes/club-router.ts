import { Router } from 'express'
import { GetAllClubsController } from '../../../application/use-cases/get-all-clubs/get-all-clubs-controller'

class ClubRouter {
  static using(getAllClubsController: GetAllClubsController): Router {
    const clubRouter = Router()
    clubRouter.get('/', (req, res) => {
      getAllClubsController.execute(req, res)
    })
    return clubRouter
  }
}

export { ClubRouter }
