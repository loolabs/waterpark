import {
  AfterCreate,
  Collection,
  Entity,
  EventArgs,
  LoadStrategy,
  ManyToMany,
  Property,
} from '@mikro-orm/core'
import { DomainEvents } from '../../../../domain/events/domain-events'
import { UniqueEntityID } from '../../../../domain/unique-entity-id'
import { BaseEntity } from '../base.entity'
import { ClubEntity } from './club.entity'
import { LegacyTagEntity } from './tag.entity'

@Entity()
export class EventEntity extends BaseEntity {
  @Property()
  name!: string

  @Property({ columnType: 'text' })
  description!: string

  @Property({ columnType: 'text', nullable: true })
  url?: string

  @Property({ columnType: 'text' })
  bannerImage!: string

  @Property()
  startTime!: Date

  @Property()
  endTime!: Date

  @Property({ columnType: 'text', nullable: true })
  facebook?: string

  @Property({ columnType: 'text', nullable: true })
  twitter?: string

  @Property({ columnType: 'text', nullable: true })
  instagram?: string

  @ManyToMany({ entity: () => ClubEntity, mappedBy: 'events', strategy: LoadStrategy.JOINED })
  clubs = new Collection<ClubEntity>(this)

  @ManyToMany({ entity: () => LegacyTagEntity, mappedBy: 'events', strategy: LoadStrategy.JOINED })
  tags = new Collection<LegacyTagEntity>(this)

  @AfterCreate()
  afterCreate(target: EventArgs<EventEntity>) {
    const id = target.entity.id
    const aggregateId = new UniqueEntityID(id)
    DomainEvents.dispatchEventsForAggregate(aggregateId)
  }
}
