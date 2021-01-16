import { EntityManager, EntityRepository, MikroORM } from '@mikro-orm/core'
import { UserEntity } from './entities/user.entity'
import { ClubEntity } from './entities/club.entity'
export const DB = {} as {
  orm: MikroORM
  em: EntityManager
  usersEntityRepo: EntityRepository<UserEntity>
  clubsEntityRepo: EntityRepository<ClubEntity>
}
