import { Router } from 'express'
import { APIRouter } from './types'
import { Controllers } from '../../application'
import { UserRouter } from '../../../modules/users/infra/http/routes/user-router'
import { ClubRouter } from '../../../modules/legacy/clubs/infra/http/routes/club-router'
import { EventRouter } from '../../../modules/legacy/events/infra/http/routes/event-router'
import { PlaceRouter } from '../../../modules/places/infra/http/routes/place-router'

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

const setupV2APIRouter = (controllers: Controllers): APIRouter => {
  const endpointRouters = {
    places: PlaceRouter.using(controllers.getAllPlaces)
  }
  const router = Router()
  router.use('/places', endpointRouters.places)
  return router;
}

const setupVersionedAPIRouter = (controllers: Controllers): APIRouter => {
  const v1Router = setupV1APIRouter(controllers)
  const v2Router = setupV2APIRouter(controllers)
  const router = Router()
  router.use('/v1', v1Router)
  router.use('/v2', v2Router)
  return router
}

export { setupVersionedAPIRouter }
