import { Router } from 'express'
import { Controllers } from '../../application'
import { APIRouter } from './api-router'
import { setupV1APIRouter } from './v1-api-router'

export const setupVersionedAPIRouter = (controllers: Controllers): APIRouter => {
  const v1Router = setupV1APIRouter(controllers)
  const router = Router()
  router.use('/v1', v1Router)
  return router
}
