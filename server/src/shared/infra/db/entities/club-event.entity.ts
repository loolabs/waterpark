import { Entity, ManyToOne } from '@mikro-orm/core'
import { ClubEntity } from './club.entity'
import { EventEntity } from './event.entity'


@Entity()
export class ClubEvent {
  @ManyToOne()
  club!: ClubEntity
  @ManyToOne()
  event!: EventEntity
}