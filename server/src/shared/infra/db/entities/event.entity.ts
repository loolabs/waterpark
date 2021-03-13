import { AfterCreate, Collection, Entity, LoadStrategy, ManyToMany,  Property } from '@mikro-orm/core'
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

  @Property({ nullable: true })
  url!: string | null

  @Property()
  startTime!: Date

  @Property()
  endTime!: Date

  @Property({ nullable: true })
  facebookLink!: string | null

  @Property({ nullable: true })
  twitterLink!: string | null

  @Property({ nullable: true })
  instagramLink!: string | null

  @Property({ nullable: true })
  websiteLink!: string | null

  @Property({ nullable: true })
  backgroundImageURL!: string | null

  @ManyToMany({ entity: () => ClubEntity, mappedBy: "events", strategy: LoadStrategy.JOINED })
  clubs = new Collection<ClubEntity>(this)

  @ManyToMany({ entity: () => TagEntity, mappedBy: "events", strategy: LoadStrategy.JOINED })
  tags = new Collection<TagEntity>(this)

  // TODO: fix any type
  @AfterCreate()
  afterCreate(target: any) {
    const id = target.entity.id
    const aggregateId = new UniqueEntityID(id)
    DomainEvents.dispatchEventsForAggregate(aggregateId)
  }
}
