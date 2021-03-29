import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core'
import { BaseEntity } from '../base.entity'
import { ClubEntity } from '../club.entity'
import { EventEntity } from '../event.entity'

@Entity()
export class TagEntity extends BaseEntity {
  @Property()
  name!: string

  @ManyToMany({ entity: () => ClubEntity, inversedBy: "tags" })
  clubs = new Collection<ClubEntity>(this)

  @ManyToMany({ entity: () => EventEntity, inversedBy: "tags" })
  events = new Collection<EventEntity>(this)
}
