import { Router } from 'express'
import { APIRouter } from './types'
import { Controllers } from '../../application'
import { UserRouter } from '../../../modules/users/infra/http/routes/user-router'
import { ClubRouter } from '../../../modules/clubs/infra/http/routes/club-router'
import { EventRouter } from '../../../modules/events/infra/http/routes/event-router'

const setupV1APIRouter = (controllers: Controllers): APIRouter => {
  const endpointRouters = {
    clubs: ClubRouter.using(controllers.getAllClubs),
    events: EventRouter.using(controllers.getAllEvents),
    users: UserRouter.using(controllers.createUser),
  }

  const router = Router()
  router.get('/', (_req, res) => {
    return res.json({ message: 'Water, water, water. Loo, loo loo.' })
  })
  router.use('/clubs', endpointRouters.clubs)
  router.use('/events', endpointRouters.events)
  router.use('/users', endpointRouters.users)
  return router
}

const setupVersionedAPIRouter = (controllers: Controllers): APIRouter => {
  const v1Router = setupV1APIRouter(controllers)
  const router = Router()
  router.use('/v1', v1Router)
  return router
}

export { setupVersionedAPIRouter }
