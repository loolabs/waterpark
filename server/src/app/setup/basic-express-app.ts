import * as types from '../types'
import express from 'express'
import { RequestContext } from '@mikro-orm/core'

export const BasicExpressApp = (
  apiExpressRouter: types.APIExpressRouter,
  { em: entityManager }: types.MikroORM
): types.ExpressApp => {
  const app = express()
  app.use(express.json())
  app.use((_req, _res, next) => RequestContext.create(entityManager, next))
  app.use('/api', apiExpressRouter)
  app.use((_req, res) => res.status(404).json({ message: 'No route found' }))
  return app
}
