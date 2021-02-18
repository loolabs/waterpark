import express from 'express'
import { userRouter } from '../../../../modules/users/infra/http/routes'
import { clubRouter } from '../../../../modules/clubs/infra/http/routes' 

const v1Router = express.Router()

v1Router.get('/', (_req, res) => {
  return res.json({ message: 'Water, water, water. Loo, loo loo.' })
})

v1Router.use('/users', userRouter)
v1Router.use('/clubs', clubRouter)

export { v1Router }
