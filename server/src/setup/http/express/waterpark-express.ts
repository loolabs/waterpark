import { WaterparkExpress } from './types'
import { setupVersionedAPIRouter } from './versioned-api-router'
import { BasicWebServerOptions, setupBasicWebServer } from './basic-web-server'
import { Controllers, UseCases } from '../../application'

interface WaterparkExpressOptions extends BasicWebServerOptions {}

const setupWaterparkExpress = (
  controllers: Controllers,
  useCases: UseCases,
  options: WaterparkExpressOptions
): WaterparkExpress => {
  const apiRouter = setupVersionedAPIRouter(controllers)
  const webServer = setupBasicWebServer(apiRouter, controllers, useCases, options)

  return {
    apiRouter,
    webServer,
  }
}

export { WaterparkExpressOptions, setupWaterparkExpress }
