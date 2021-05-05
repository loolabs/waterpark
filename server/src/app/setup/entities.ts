import * as types from '../types'
import { ClubEntity } from '../../shared/infra/db/entities/club.entity'
import { EventEntity } from '../../shared/infra/db/entities/event.entity'
import { TagEntity } from '../../shared/infra/db/entities/tags/tag.entity'
import { UserEntity } from '../../shared/infra/db/entities/user.entity'

export const Entities = (): types.Entities => {
  return {
    club: ClubEntity,
    event: EventEntity,
    tag: TagEntity,
    user: UserEntity,
  }
}
