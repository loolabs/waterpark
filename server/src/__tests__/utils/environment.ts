import { createMockClubEntities } from './create-club-entities'
import { createMockEventEntities } from './create-event-entities'
import { createMockTagEntities } from './create-tag-entities'
import { setup, types } from '../../app/'

const clubEntities = createMockClubEntities()
const eventEntities = createMockEventEntities()
const tagEntities = createMockTagEntities()

export interface Variables {
  app: types.ExpressApp
}

// This is similar to Jest environments.
// We don't use Jest environments here because they modify the global object in a type-unsafe way.
class TestEnvironment {
  protected entities!: types.Entities
  protected orm!: types.MikroORM
  protected mikroEntityRepos!: types.MikroEntityRepos

  public async setup(): Promise<Variables> {
    const entities = setup.Entities()
    this.orm = await setup.MikroORM({ debug: false })
    this.mikroEntityRepos = setup.MikroEntityRepos(entities, this.orm)

    eventEntities.forEach((eventEntity) => {
      eventEntity.clubs.add(...clubEntities)
      eventEntity.tags.add(...tagEntities)
    })
    clubEntities.forEach((clubEntity) => clubEntity.tags.add(...tagEntities))
    await this.mikroEntityRepos.event.persist(eventEntities).flush()

    const repos = setup.MikroRepos(this.mikroEntityRepos)
    const useCases = setup.UseCases(repos)
    const controllers = setup.Controllers(useCases)
    const apiExpressRouter = setup.VersionedAPIExpressRouter(controllers)
    const expressApp = setup.BasicExpressApp(apiExpressRouter, this.orm)
    return { app: expressApp }
  }

  public async teardown() {
    await this.mikroEntityRepos.club.remove(clubEntities).flush()
    await this.mikroEntityRepos.tag.remove(tagEntities).flush()
    await this.mikroEntityRepos.event.remove(eventEntities).flush()
    await this.orm.close()
  }
}

export const environment = new TestEnvironment()
