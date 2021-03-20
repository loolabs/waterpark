import { DB } from '../../shared/infra/db'
import { MikroORM } from '@mikro-orm/core'
import mikroORMConfig from '../../mikro-orm.config'
import { createMockClubEntities } from './create-club-entities'
import { createMockEventEntities } from './create-event-entities'
import { createMockTagEntities } from './create-tag-entities'
import { EventEntity } from '../../shared/infra/db/entities/event.entity'
import { TagEntity } from '../../shared/infra/db/entities/tags/tag.entity'
import { ClubEntity } from '../../shared/infra/db/entities/club.entity'

const clubEntities = createMockClubEntities()
const eventEntities = createMockEventEntities()
const tagEntities = createMockTagEntities()

export const populate = async () => {
  DB.orm = await MikroORM.init({
    ...mikroORMConfig,
    debug: false,
  })
  DB.em = DB.orm.em
  DB.eventsEntityRepo = DB.orm.em.getRepository(EventEntity)
  DB.clubsEntityRepo = DB.orm.em.getRepository(ClubEntity)
  DB.tagsEntityRepo = DB.orm.em.getRepository(TagEntity)
  eventEntities.forEach((eventEntity) => {
    eventEntity.clubs.add(...clubEntities)
    eventEntity.tags.add(...tagEntities)
  })
  DB.eventsEntityRepo.persist(eventEntities)
  await DB.eventsEntityRepo.flush()
}

export const teardown = async () => {
    await DB.clubsEntityRepo.remove(clubEntities).flush()
    await DB.tagsEntityRepo.remove(tagEntities).flush()
    await DB.eventsEntityRepo.remove(eventEntities).flush()
    await DB.orm.close()
}
