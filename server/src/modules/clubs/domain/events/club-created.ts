import { DomainEvent } from '../../../../shared/domain/events/domain-event'
import { UniqueEntityID } from '../../../../shared/domain/unique-entity-id'
import { Club } from '../entities/club'

export class ClubCreated implements DomainEvent {
  public dateTimeOccurred: Date
  public club: Club

  constructor(club: Club) {
    this.dateTimeOccurred = new Date()
    this.club = club
  }

  public getAggregateId(): UniqueEntityID {
    return this.club.id
  }
}
