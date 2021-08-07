<<<<<<< HEAD
import { DomainEvent } from '../../../../shared/domain/events/domain-event'
import { UniqueEntityID } from '../../../../shared/domain/unique-entity-id'
import { Washroom } from '../entities/washroom'

export class WashroomCreated implements DomainEvent {
  public dateTimeOccurred: Date
  public washroom: Washroom

  constructor(washroom: Washroom) {
    this.dateTimeOccurred = new Date()
    this.washroom = washroom
  }

  public getAggregateId(): UniqueEntityID {
    return this.washroom.id
=======
import { DomainEvent } from '../../../../shared/domain/events/domain-event';
import { UniqueEntityID } from '../../../../shared/domain/unique-entity-id';
import { Washroom } from '../entities/washroom';

export class WashroomCreated implements DomainEvent {
  public dateTimeOccurred: Date;
  public washroom: Washroom;

  constructor(washroom: Washroom) {
    this.dateTimeOccurred = new Date();
    this.washroom = washroom;
  }

  public getAggregateId(): UniqueEntityID {
    return this.washroom.id;
>>>>>>> 254b99c8f433e5f91c174bce3cfb264e5a8dd40f
  }
}
