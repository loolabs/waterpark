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
    // must set environment variable DATABASE_URL to postgresql://loolabs:loolabs@localhost/clubs
    // to access postgres container on Docker
    // TODO: fix integration testing
    this.mikroDB = await db.setupMikroDB({ debug: false })
    const { orm, repos } = this.mikroDB

    this.application = app.setupApplication(repos)
    const { controllers, useCases } = this.application

    this.waterparkExpress = http.setupWaterparkExpress(controllers, useCases, { mikroORM: orm })
    const { webServer } = this.waterparkExpress

    return { webServer }
  }

  public async teardown() {
    await this.mikroDB.orm.close()
  }
}
