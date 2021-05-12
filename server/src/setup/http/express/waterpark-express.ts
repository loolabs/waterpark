import { Controllers } from '../../application'
import { setupVersionedAPIRouter } from './versioned-api-router'
import { BasicAppOptions, setupBasicApp } from './basic-app'
import { Express } from './express'

export const setupWaterparkExpress = (
  controllers: Controllers,
  options: BasicAppOptions
): Express => {
  const apiRouter = setupVersionedAPIRouter(controllers)
  const app = setupBasicApp(apiRouter, options)

  return {
    apiRouter,
    app,
  }
}
