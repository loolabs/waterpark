import { UniqueEntityID } from '../unique-entity-id'

export interface DomainEvent {
  dateTimeOccurred: Date
  getAggregateId(): UniqueEntityID
}
