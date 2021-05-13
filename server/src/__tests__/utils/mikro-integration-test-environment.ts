import { mocks } from '../../test-utils'
import { db, app, http } from '../../setup'
import { ClubEntity } from '../../shared/infra/db/entities/club.entity'
import { EventEntity } from '../../shared/infra/db/entities/event.entity'
import { TagEntity } from '../../shared/infra/db/entities/tags/tag.entity'

export interface Variables {
  webServer: http.WebServer
}

// This is similar to Jest environments.
// We don't use Jest environments here because they modify the global object in a type-unsafe way.
class MikroIntegrationTestEnvironment {
  protected mikroDB!: db.MikroDB

  protected ids!: Array<string>
  protected clubEntities!: Array<ClubEntity>
  protected eventEntities!: Array<EventEntity>
  protected tagEntities!: Array<TagEntity>

  public async setup(): Promise<Variables> {
    this.mikroDB = await db.setupMikroDB({ debug: false })
    const { orm, entityRepos, repos } = this.mikroDB

    this.ids = [1, 2, 3].map(String)
    this.clubEntities = this.ids.map(mocks.mockClubEntity)
    this.eventEntities = this.ids.map(mocks.mockEventEntity)
    this.tagEntities = this.ids.map(mocks.mockTagEntity)
    this.eventEntities.forEach((eventEntity) => {
      eventEntity.clubs.add(...this.clubEntities)
      eventEntity.tags.add(...this.tagEntities)
    })
    this.clubEntities.forEach((clubEntity) => clubEntity.tags.add(...this.tagEntities))
    await entityRepos.event.persist(this.eventEntities).flush()

    const { controllers } = app.setupApplication(repos)
    const { webServer } = http.setupWaterparkExpress(controllers, { mikroORM: orm })
    return { webServer }
  }

  public async teardown() {
    const { orm, entityRepos } = this.mikroDB

    await entityRepos.club.remove(this.clubEntities).flush()
    await entityRepos.tag.remove(this.tagEntities).flush()
    await entityRepos.event.remove(this.eventEntities).flush()

    await orm.close()
  }
}

const mikroTestEnvironment = new MikroIntegrationTestEnvironment()

export default mikroTestEnvironment
