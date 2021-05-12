import { APIRouter } from './api-router'
import { App } from './app'

export interface Express {
  apiRouter: APIRouter
  app: App
}
