import { RequestContext } from '@mikro-orm/core'
import express, { Router } from 'express'
import { MikroORM } from '../../db'
import { App } from './app'

export interface BasicAppOptions {
  mikroORM?: MikroORM
}

export const setupBasicApp = (expressRouter: Router, options: BasicAppOptions): App => {
  const app = express()
  app.use(express.json())

  const entityManager = options?.mikroORM?.em
  if (entityManager !== undefined) {
    app.use((_req, _res, next) => RequestContext.create(entityManager, next))
  }

  app.use('/api', expressRouter)
  app.use((_req, res) => res.status(404).json({ message: 'No route found' }))

  return app
}
