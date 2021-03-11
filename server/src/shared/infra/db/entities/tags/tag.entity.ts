import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core'
import { BaseEntity } from '../base.entity'
import { ClubEntity } from '../club.entity'
import { EventEntity } from '../event.entity'

@Entity()
export class TagEntity extends BaseEntity {
  @Property()
  name!: string
  @ManyToMany(() => ClubEntity, (club) => club.tags, { owner: true })
  clubs = new Collection<ClubEntity>(this)

  @ManyToMany(() => EventEntity, (event) => event.tags, { owner: true })
  events = new Collection<EventEntity>(this)
}
