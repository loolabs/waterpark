import { EntityManager, EntityRepository, MikroORM } from '@mikro-orm/core'
import { UserEntity } from './entities/user.entity'
import { ClubEntity } from './entities/club.entity'
import { EventEntity } from './entities/event.entity'
import { TagEntity } from './entities/tags/tag.entity'

export const DB = {} as {
  orm: MikroORM
  em: EntityManager
  usersEntityRepo: EntityRepository<UserEntity>
  eventsEntityRepo: EntityRepository<EventEntity>
  clubsEntityRepo: EntityRepository<ClubEntity>
  tagsEntityRepo: EntityRepository<TagEntity>
}
