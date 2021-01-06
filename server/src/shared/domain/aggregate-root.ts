import { Entity } from './entity'
import { DomainEvent } from './events/domain-event'
import { DomainEvents } from './events/domain-events'
import { UniqueEntityID } from './unique-entity-id'

export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: Array<DomainEvent> = []

  protected addDomainEvent(domainEvent: DomainEvent): void {
    // Add the domain event to this aggregate's list of domain events
    this._domainEvents.push(domainEvent)
    // Add this aggregate instance to the domain event's list of aggregates who's
    // events it eventually needs to dispatch.
    DomainEvents.markAggregateForDispatch(this)
    // Log the domain event
    this.logDomainEventAdded(domainEvent)
  }

  private logDomainEventAdded(domainEvent: DomainEvent): void {
    const thisClass = Reflect.getPrototypeOf(this)
    const domainEventClass = Reflect.getPrototypeOf(domainEvent)
    console.info(
      `[Domain Event Created]:`,
      thisClass.constructor.name,
      '==>',
      domainEventClass.constructor.name
    )
  }

  public clearEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length)
  }

  get id(): UniqueEntityID {
    return this._id
  }

  get domainEvents(): DomainEvent[] {
    return this._domainEvents
  }
}
