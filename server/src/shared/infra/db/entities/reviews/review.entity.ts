import { AfterCreate, Entity, Enum, EventArgs, ManyToOne, Property } from '@mikro-orm/core'
import { DomainEvents } from '../../../../domain/events/domain-events'
import { UniqueEntityID } from '../../../../domain/unique-entity-id'
import { BaseEntity } from '../base.entity'
import { PlaceEntity } from '../places/place.entity'

export const enum Faculty {
  Mathematics,
  Engineering,
  Arts,
  Health,
  Science,
  Environment,
  NonWaterloo,
}

export const enum Status {
  U1,
  U2,
  U3,
  U4,
  U5,
  U6Plus,
  Masters,
  PhD,
  Faculty,
  Other,
}

@Entity()
export class ReviewEntity extends BaseEntity {
  @ManyToOne({ entity: () => PlaceEntity, inversedBy: 'reviews' })
  place!: PlaceEntity

  @Property({ columnType: 'text' })
  comment!: string

  @Property({ columnType: 'text' })
  avatarImage!: string

  @Enum({ type: 'Faculty' })
  faculty!: Faculty

  @Enum({ type: 'Status' })
  status!: Status

  @AfterCreate()
  afterCreate(target: EventArgs<ReviewEntity>) {
    const id = target.entity.id
    const aggregateId = new UniqueEntityID(id)
    DomainEvents.dispatchEventsForAggregate(aggregateId)
  }
}
