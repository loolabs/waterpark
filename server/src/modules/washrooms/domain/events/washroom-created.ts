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
  }
}
