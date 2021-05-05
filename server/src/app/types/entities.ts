import { ClubEntity } from '../../shared/infra/db/entities/club.entity'
import { EventEntity } from '../../shared/infra/db/entities/event.entity'
import { TagEntity } from '../../shared/infra/db/entities/tags/tag.entity'
import { UserEntity } from '../../shared/infra/db/entities/user.entity'

export interface Entities {
  club: typeof ClubEntity
  event: typeof EventEntity
  tag: typeof TagEntity
  user: typeof UserEntity
}
