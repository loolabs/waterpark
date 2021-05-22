import { db, app, http } from './setup'

interface WaterparkOptions {
  port: string
}

const waterpark = async (options: WaterparkOptions) => {
  const { orm, repos } = await db.setupMikroDB()
  const migrator = orm.getMigrator()
  await migrator.up()

  const { useCases, controllers } = app.setupApplication(repos)

  const { webServer } = http.setupWaterparkExpress(controllers, useCases, { mikroORM: orm })
  webServer.listen(options.port, () => {
    console.log(`Waterpark REST API server running on http://localhost:${port}/api/v1 🦆`)
  })
}

const port = process.env.PORT || '3001'
const options = { port }
waterpark(options)
