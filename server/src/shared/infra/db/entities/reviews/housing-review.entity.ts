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
export class HousingReviewEntity {
  [PrimaryKeyType]: ReviewEntity['id']

  @OneToOne({ primary: true, strategy: LoadStrategy.JOINED })
  review!: ReviewEntity

  @Property()
  cleanlinessRating!: number

  @Property()
  priceRating!: number

  @Property()
  managementRating!: number

  @AfterCreate()
  afterCreate(target: EventArgs<HousingReviewEntity>) {
    const id = target.entity.review.id
    const aggregateId = new UniqueEntityID(id)
    DomainEvents.dispatchEventsForAggregate(aggregateId)
  }
}
