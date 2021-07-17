import {
  AfterCreate,
  Entity,
  EventArgs,
  LoadStrategy,
  OneToOne,
  PrimaryKeyType,
  Property,
} from '@mikro-orm/core'
import { DomainEvents } from '../../../../domain/events/domain-events'
import { UniqueEntityID } from '../../../../domain/unique-entity-id'
import { ReviewEntity } from './review.entity'

@Entity()
export class WashroomReviewEntity {
  [PrimaryKeyType]: ReviewEntity['id']

  @OneToOne({ primary: true, strategy: LoadStrategy.JOINED })
  review!: ReviewEntity

  @Property()
  cleanlinessRating!: number

  @AfterCreate()
  afterCreate(target: EventArgs<WashroomReviewEntity>) {
    const id = target.entity.review.id
    const aggregateId = new UniqueEntityID(id)
    DomainEvents.dispatchEventsForAggregate(aggregateId)
  }
}
