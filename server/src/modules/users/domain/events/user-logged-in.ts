import { DomainEvent } from '../../../../shared/domain/events/domain-event'
import { UniqueEntityID } from '../../../../shared/domain/unique-entity-id'
import { User } from '../entities/user'

export class UserLoggedIn implements DomainEvent {
  public dateTimeOccurred: Date
  public user: User

  constructor(user: User) {
    this.dateTimeOccurred = new Date()
    this.user = user
  }

  public getAggregateId(): UniqueEntityID {
    return this.user.id
  }
}
