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

    const migrator = this.mikroDB.orm.getMigrator()
    if (process.env.IS_CI === 'true') await migrator.up()

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
