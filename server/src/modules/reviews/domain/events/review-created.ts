import { DomainEvent } from '../../../../shared/domain/events/domain-event'
import { UniqueEntityID } from '../../../../shared/domain/unique-entity-id'
import { Review } from '../entities/review'

export class ReviewCreated implements DomainEvent {
  public dateTimeOccurred: Date
  public review: Review

  constructor(review: Review) {
    this.dateTimeOccurred = new Date()
    this.review = review
  }

  public getAggregateId(): UniqueEntityID {
    return this.review.id
  }
}
