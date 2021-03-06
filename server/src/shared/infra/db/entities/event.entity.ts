import { AfterCreate, Collection, Entity, OneToMany, Property } from '@mikro-orm/core'
import { DomainEvents } from '../../../domain/events/domain-events'
import { UniqueEntityID } from '../../../domain/unique-entity-id'
import { BaseEntity } from './base.entity'
import { ClubEvent } from './club-event.entity'
import { EventTag } from './tags/event-tag.entity'

@Entity()
export class EventEntity extends BaseEntity {
  @Property()
  name!: string

  @Property()
  description!: string

  @Property()
  url!: string

  @Property()
  startTime!: Date

  @Property()
  endTime!: Date

  @Property()
  facebookLink!: string

  @Property()
  twitterLink!: string

  @Property()
  instagramLink!: string

  @Property()
  websiteLink!: string

  @Property()
  backgroundImageURL!: string

  @OneToMany(() => ClubEvent, (clubEvent) => clubEvent.event)
  clubEvent = new Collection<ClubEvent>(this)

  @OneToMany(() => EventTag, (eventTag) => eventTag.tag)
  eventTag = new Collection<EventTag>(this)

  // TODO: fix any type
  @AfterCreate()
  afterCreate(target: any) {
    const id = target.entity.id
    const aggregateId = new UniqueEntityID(id)
    DomainEvents.dispatchEventsForAggregate(aggregateId)
  }
}
