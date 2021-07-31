import { DomainEvent } from '../../../../shared/domain/events/domain-event'
import { UniqueEntityID } from '../../../../shared/domain/unique-entity-id'
import { Place } from '../entities/washroom'

export class WashroomCreated implements DomainEvent {
  public dateTimeOccurred: Date
  public event: Place

  constructor(event: Place) {
    this.dateTimeOccurred = new Date()
    this.event = event
  }

  public getAggregateId(): UniqueEntityID {
    return this.event.id
  }
}
