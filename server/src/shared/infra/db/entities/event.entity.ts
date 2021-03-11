import { AfterCreate, Collection, Entity, ManyToMany,  Property } from '@mikro-orm/core'
import { DomainEvents } from '../../../domain/events/domain-events'
import { UniqueEntityID } from '../../../domain/unique-entity-id'
import { BaseEntity } from './base.entity'
import { ClubEntity } from './club.entity'
import { TagEntity } from './tags/tag.entity'

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

  @ManyToMany(() => ClubEntity, (club) => club.events)
  clubs = new Collection<ClubEntity>(this)

  @ManyToMany(() => TagEntity, (tag) => tag.events)
  tags = new Collection<TagEntity>(this)

  // TODO: fix any type
  @AfterCreate()
  afterCreate(target: any) {
    const id = target.entity.id
    const aggregateId = new UniqueEntityID(id)
    DomainEvents.dispatchEventsForAggregate(aggregateId)
  }
}
