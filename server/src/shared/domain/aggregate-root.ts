import { Entity } from './entity'
import { DomainEvent } from './events/domain-event'
import { DomainEvents } from './events/domain-events'
import { UniqueEntityID } from './unique-entity-id'

export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: Array<DomainEvent> = []

  protected addDomainEvent(domainEvent: DomainEvent): void {
    // Add the domain event to this aggregate's list of domain events
    this._domainEvents.push(domainEvent)
    // Add this aggregate instance to the DomainEvents' list of aggregates whose
    // events it eventually needs to dispatch.
    DomainEvents.markAggregateForDispatch(this)
    // Log the domain event
    this.logDomainEventAdded(domainEvent)
  }

  private logDomainEventAdded(domainEvent: DomainEvent): void {
    const thisClass = Reflect.getPrototypeOf(this)
    const domainEventClass = Reflect.getPrototypeOf(domainEvent)
    if (thisClass != null && domainEventClass != null) {
      //TODO: fix hack; ts compiler complains about potential null
      console.info(
        `[Domain Event Created]:`,
        thisClass.constructor.name,
        '==>',
        domainEventClass.constructor.name
      )
    } else {
      throw new Error('Null class returned by Reflect.getProtoTypeOf')
    }
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
