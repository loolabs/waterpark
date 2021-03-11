import { AfterCreate, Collection, Entity, ManyToMany, Property } from '@mikro-orm/core'
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
  backgroundImageURL!: string

  @Property()
  iconURL!: string

  @Property()
  facebookLink!: string

  @Property()
  twitterLink!: string

  @Property()
  instagramLink!: string

  @Property()
  websiteLink!: string

  @ManyToMany(() => EventEntity, (event) => event.clubs, { owner: true })
  events = new Collection<EventEntity>(this)

  @ManyToMany(() => TagEntity, (tag) => tag.clubs)
  tags = new Collection<TagEntity>(this)

  // TODO: fix any type
  @AfterCreate()
  afterCreate(target: any) {
    const id = target.entity.id
    const aggregateId = new UniqueEntityID(id)
    DomainEvents.dispatchEventsForAggregate(aggregateId)
  }
}
