import { Express } from './types'
import { setupVersionedAPIRouter } from './versioned-api-router'
import { BasicWebServerOptions, setupBasicWebServer } from './basic-web-server'
import { Controllers } from '../../application'

interface WaterparkExpressOptions extends BasicWebServerOptions {}

const setupWaterparkExpress = (
  controllers: Controllers,
  options: WaterparkExpressOptions
): Express => {
  const apiRouter = setupVersionedAPIRouter(controllers)
  const webServer = setupBasicWebServer(apiRouter, options)

  return {
    apiRouter,
    webServer,
  }
}

export { WaterparkExpressOptions, setupWaterparkExpress }
