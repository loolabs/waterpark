import { EntityManager, EntityRepository, MikroORM } from '@mikro-orm/core'
import { UserEntity } from './entities/user.entity'

export const DB = {} as {
  orm: MikroORM
  em: EntityManager
  usersEntityRepo: EntityRepository<UserEntity>
}
