import { mocks } from '../../test-utils'
import { setup, types } from '../../app'
import { ClubEntity } from '../../shared/infra/db/entities/club.entity'
import { EventEntity } from '../../shared/infra/db/entities/event.entity'
import { TagEntity } from '../../shared/infra/db/entities/tags/tag.entity'

export interface Variables {
  app: types.ExpressApp
}

// This is similar to Jest environments.
// We don't use Jest environments here because they modify the global object in a type-unsafe way.
class MikroIntegrationTestEnvironment {
  protected ids!: Array<string>
  protected clubEntities!: Array<ClubEntity>
  protected eventEntities!: Array<EventEntity>
  protected tagEntities!: Array<TagEntity>

  protected entities!: types.Entities
  protected orm!: types.MikroORM
  protected mikroEntityRepos!: types.MikroEntityRepos

  public async setup(): Promise<Variables> {
    this.ids = [1, 2, 3].map(String)
    this.clubEntities = this.ids.map(mocks.mockClubEntity)
    this.eventEntities = this.ids.map(mocks.mockEventEntity)
    this.tagEntities = this.ids.map(mocks.mockTagEntity)

    const entities = setup.Entities()
    this.orm = await setup.MikroORM({ debug: false })
    this.mikroEntityRepos = setup.MikroEntityRepos(entities, this.orm)

    this.eventEntities.forEach((eventEntity) => {
      eventEntity.clubs.add(...this.clubEntities)
      eventEntity.tags.add(...this.tagEntities)
    })
    this.clubEntities.forEach((clubEntity) => clubEntity.tags.add(...this.tagEntities))
    await this.mikroEntityRepos.event.persist(this.eventEntities).flush()

    const repos = setup.MikroRepos(this.mikroEntityRepos)
    const useCases = setup.UseCases(repos)
    const controllers = setup.Controllers(useCases)
    const apiExpressRouter = setup.VersionedAPIExpressRouter(controllers)
    const expressApp = setup.BasicExpressApp(apiExpressRouter, this.orm)
    return { app: expressApp }
  }

  public async teardown() {
    await this.mikroEntityRepos.club.remove(this.clubEntities).flush()
    await this.mikroEntityRepos.tag.remove(this.tagEntities).flush()
    await this.mikroEntityRepos.event.remove(this.eventEntities).flush()

    await this.orm.close()
  }
}

const mikroTestEnvironment = new MikroIntegrationTestEnvironment()

export default mikroTestEnvironment
