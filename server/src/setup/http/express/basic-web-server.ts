import { RequestContext } from '@mikro-orm/core'
import express from 'express'
import { APIRouter, WebServer } from './types'
import { MikroORM } from '../../database'
import cors from 'cors'

export interface BasicWebServerOptions {
  mikroORM?: MikroORM
}

export function setupBasicWebServer(
  apiRouter: APIRouter,
  options: BasicWebServerOptions
): WebServer {
  const server = express()
  server.use(express.json())
  server.use(cors())

  const entityManager = options?.mikroORM?.em
  if (entityManager !== undefined) {
    server.use((_req, _res, next) => RequestContext.create(entityManager, next))
  }

  server.use('/api', apiRouter)
  server.use((_req, res) => res.status(404).json({ message: 'No route found' }))

  return server
}
