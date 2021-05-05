import { EntityRepository } from '@mikro-orm/core'
import { ClubEntity } from '../../shared/infra/db/entities/club.entity'
import { EventEntity } from '../../shared/infra/db/entities/event.entity'
import { TagEntity } from '../../shared/infra/db/entities/tags/tag.entity'
import { UserEntity } from '../../shared/infra/db/entities/user.entity'

export interface MikroEntityRepos {
  club: EntityRepository<ClubEntity>
  event: EntityRepository<EventEntity>
  tag: EntityRepository<TagEntity>
  user: EntityRepository<UserEntity>
}
