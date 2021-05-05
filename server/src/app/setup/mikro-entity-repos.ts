import * as types from '../types'
import { MikroORM } from '@mikro-orm/core'

export const MikroEntityRepos = (
  entities: types.Entities,
  { em: entityManager }: MikroORM
): types.MikroEntityRepos => {
  return {
    club: entityManager.getRepository(entities.club),
    event: entityManager.getRepository(entities.event),
    tag: entityManager.getRepository(entities.tag),
    user: entityManager.getRepository(entities.user),
  }
}
