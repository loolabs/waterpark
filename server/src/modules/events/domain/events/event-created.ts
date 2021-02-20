import { DomainEvent } from '../../../../shared/domain/events/domain-event'
import { UniqueEntityID } from '../../../../shared/domain/unique-entity-id'
import { Event } from '../entities/event'

export class EventCreated implements DomainEvent {
  public dateTimeOccurred: Date
  public event: Event

  constructor(event: Event) {
    this.dateTimeOccurred = new Date()
    this.event = event
  }

  public getAggregateId(): UniqueEntityID {
    return this.event.id
  }
}
