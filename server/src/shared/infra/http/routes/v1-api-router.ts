import { Router } from 'express'

type EndpointRouters = {
  userRouter: Router
  clubRouter: Router
  eventRouter: Router
}

class v1APIRouter {
  static using({ userRouter, clubRouter, eventRouter }: EndpointRouters): Router {
    const v1apiRouter = Router()
    v1apiRouter.get('/', (_req, res) => {
      return res.json({ message: 'Water, water, water. Loo, loo loo.' })
    })
    v1apiRouter.use('/users', userRouter)
    v1apiRouter.use('/clubs', clubRouter)
    v1apiRouter.use('/events', eventRouter)
    return v1apiRouter
  }
}

export { v1APIRouter }
