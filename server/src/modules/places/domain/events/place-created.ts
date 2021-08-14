import { DomainEvent } from '../../../../shared/domain/events/domain-event'
import { UniqueEntityID } from '../../../../shared/domain/unique-entity-id'
import { Place } from '../entities/place'

export class PlaceCreated implements DomainEvent {
  public dateTimeOccurred: Date
  public place: Place

  constructor(place: Place) {
    this.dateTimeOccurred = new Date()
    this.place = place
  }

  public getAggregateId(): UniqueEntityID {
    return this.place.id
  }
}
