import { db, app, http } from '../../setup'
import { TestEnvironment } from './environment'

export interface MikroEnvironmentVariables {
  webServer: http.WebServer
}

export class MikroTestEnvironment extends TestEnvironment<MikroEnvironmentVariables> {
  protected mikroDB!: db.MikroDB
  protected application!: app.Application
  protected waterparkExpress!: http.WaterparkExpress

  public async setup(): Promise<MikroEnvironmentVariables> {
    this.mikroDB = await db.setupMikroDB({ debug: false })
    const { orm, repos } = this.mikroDB

    this.application = app.setupApplication(repos)
    const { controllers } = this.application

    this.waterparkExpress = http.setupWaterparkExpress(controllers, { mikroORM: orm })
    const { webServer } = this.waterparkExpress

    return { webServer }
  }

  public async teardown() {
    await this.mikroDB.orm.close()
  }
}
