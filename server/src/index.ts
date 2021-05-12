import { setupMikroDB } from './setup/db'
import { setupApplication } from './setup/application'
import { setupWaterparkExpress } from './setup/http/express'

interface WaterparkOptions {
  port: string
}

const waterpark = async (options: WaterparkOptions) => {
  const { orm, repos } = await setupMikroDB()
  const migrator = orm.getMigrator()
  await migrator.up()

  const { controllers } = setupApplication(repos)

  const { app } = setupWaterparkExpress(controllers, { mikroORM: orm })
  app.listen(options.port, () => {
    console.log(`Waterpark REST API server running on http://localhost:${port}/api/v1 🦆`)
  })
}

const port = process.env.PORT || '3001'
const options = { port }
waterpark(options)
