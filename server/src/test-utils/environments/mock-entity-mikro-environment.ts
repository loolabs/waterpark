import { mocks } from '..'
import { ClubEntity } from '../../shared/infra/db/entities/club.entity'
import { EventEntity } from '../../shared/infra/db/entities/event.entity'
import { TagEntity } from '../../shared/infra/db/entities/tags/tag.entity'
import { MikroEnvironmentVariables, MikroTestEnvironment } from './mikro-environment'

export class MockEntityMikroTestEnvironment extends MikroTestEnvironment {
  protected clubEntities: Array<ClubEntity>
  protected eventEntities: Array<EventEntity>
  protected tagEntities: Array<TagEntity>

  constructor(ids: Array<any>) {
    super()

    const stringIds: Array<string> = ids.map(String)
    this.clubEntities = stringIds.map(mocks.mockClubEntity)
    this.eventEntities = stringIds.map(mocks.mockEventEntity)
    this.tagEntities = stringIds.map(mocks.mockTagEntity)
  }

  public async setup(): Promise<MikroEnvironmentVariables> {
    const variables = await super.setup()

    const { entityRepos } = this.mikroDB
    this.eventEntities.forEach((eventEntity) => {
      eventEntity.clubs.add(...this.clubEntities)
      eventEntity.tags.add(...this.tagEntities)
    })
    this.clubEntities.forEach((clubEntity) => clubEntity.tags.add(...this.tagEntities))
    await entityRepos.event.persist(this.eventEntities).flush()

    return variables
  }

  public async teardown() {
    const { entityRepos } = this.mikroDB

    await entityRepos.club.remove(this.clubEntities).flush()
    await entityRepos.tag.remove(this.tagEntities).flush()
    await entityRepos.event.remove(this.eventEntities).flush()

    await super.teardown()
  }
}
