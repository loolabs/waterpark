import * as types from '../types'
import { UserRouter } from '../../modules/users/infra/http/routes/user-router'
import { ClubRouter } from '../../modules/clubs/infra/http/routes/club-router'
import { EventRouter } from '../../modules/events/infra/http/routes/event-router'
import { Router } from 'express'

const v1APIExpressRouter = (controllers: types.Controllers): types.APIExpressRouter => {
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

export const VersionedAPIExpressRouter = (
  controllers: types.Controllers
): types.APIExpressRouter => {
  const v1Router = v1APIExpressRouter(controllers)
  const router = Router()
  router.use('/v1', v1Router)
  return router
}
