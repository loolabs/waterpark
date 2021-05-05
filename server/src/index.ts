import { setup } from './app'

const app = async (port: string) => {
  const entities = setup.Entities()
  const orm = await setup.MikroORM()
  const mikroEntityRepos = setup.MikroEntityRepos(entities, orm)
  const migrator = orm.getMigrator()
  await migrator.up()
  const repos = setup.MikroRepos(mikroEntityRepos)

  const useCases = setup.UseCases(repos)
  const controllers = setup.Controllers(useCases)

  const apiExpressRouter = setup.VersionedAPIExpressRouter(controllers)
  const expressApp = setup.BasicExpressApp(apiExpressRouter, orm)
  expressApp.listen(port, () => {
    console.log(`Waterpark REST API server running on http://localhost:${port}/api/v1 🦆`)
  })
}

const port = process.env.PORT || '3001'
app(port)
