import { AfterCreate, Collection, Entity, LoadStrategy, ManyToMany, Property, QueryOrder } from '@mikro-orm/core'
import { DomainEvents } from '../../../domain/events/domain-events'
import { UniqueEntityID } from '../../../domain/unique-entity-id'
import { BaseEntity } from './base.entity'
import { EventEntity } from './event.entity'
import { TagEntity } from './tags/tag.entity'

@Entity()
export class ClubEntity extends BaseEntity {
  @Property()
  name!: string

  @Property()
  description!: string

  @Property()
  size!: number

  @Property()
  bannerImage!: string

  @Property()
  iconImage!: string

  @Property({ nullable: true })
  facebook?: string

  @Property({ nullable: true })
  twitter?: string

  @Property({ nullable: true })
  instagram?: string

  @Property({ nullable: true })
  website?: string

  @ManyToMany({
    entity: () => EventEntity,
    inversedBy: 'clubs',
    strategy: LoadStrategy.JOINED,
    orderBy: { startTime: QueryOrder.ASC_NULLS_LAST },
  })
  events = new Collection<EventEntity>(this)

  @ManyToMany({ entity: () => TagEntity, mappedBy: 'clubs', strategy: LoadStrategy.JOINED })
  tags = new Collection<TagEntity>(this)

  // TODO: fix any type
  @AfterCreate()
  afterCreate(target: any) {
    const id = target.entity.id
    const aggregateId = new UniqueEntityID(id)
    DomainEvents.dispatchEventsForAggregate(aggregateId)
  }
}
