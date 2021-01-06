import { AggregateRoot } from '../aggregate-root'
import { UniqueEntityID } from '../unique-entity-id'
import { DomainEvent } from './domain-event'

type Callback = (event: DomainEvent) => void

export class DomainEvents {
  private static handlersMap: { [key: string]: Array<Callback> } = {}
  private static markedAggregates: AggregateRoot<any>[] = []

  /**
   * @method markAggregateForDispatch
   * @static
   * @desc Called by aggregate root objects that have created domain
   * events to eventually be dispatched when the infrastructure commits
   * the unit of work.
   */

  public static markAggregateForDispatch(aggregate: AggregateRoot<any>): void {
    const aggregateFound = !!this.findMarkedAggregateByID(aggregate.id)

    if (!aggregateFound) {
      this.markedAggregates.push(aggregate)
    }
  }

  private static dispatchAggregateEvents(aggregate: AggregateRoot<any>): void {
    aggregate.domainEvents.forEach((event: DomainEvent) => this.dispatch(event))
  }

  private static removeAggregateFromMarkedDispatchList(aggregate: AggregateRoot<any>): void {
    const index = this.markedAggregates.findIndex((a) => a.equals(aggregate))
    this.markedAggregates.splice(index, 1)
  }

  private static findMarkedAggregateByID(id: UniqueEntityID): AggregateRoot<any> | null {
    let found = null
    for (let aggregate of this.markedAggregates) {
      // TODO: bug — created domain User id is ofc different than the id saved via db
      // for now just return first one
      console.log('id', aggregate.id, id)
      // if (aggregate.id.equals(id)) {
      if (true) {
        found = aggregate
        break
      }
      // }
    }

    return found
  }

  public static dispatchEventsForAggregate(id: UniqueEntityID): void {
    const aggregate = this.findMarkedAggregateByID(id)

    if (aggregate) {
      this.dispatchAggregateEvents(aggregate)
      console.info(`[Domain Event Dispatched]:`, aggregate)
      aggregate.clearEvents()
      this.removeAggregateFromMarkedDispatchList(aggregate)
    }
  }

  public static register(callback: Callback, eventClassName: string): void {
    if (!this.handlersMap.hasOwnProperty(eventClassName)) {
      this.handlersMap[eventClassName] = []
    }
    this.handlersMap[eventClassName].push(callback)
  }

  public static clearHandlers(): void {
    this.handlersMap = {}
  }

  public static clearMarkedAggregates(): void {
    this.markedAggregates = []
  }

  private static dispatch(event: DomainEvent): void {
    const eventClassName: string = event.constructor.name

    if (this.handlersMap.hasOwnProperty(eventClassName)) {
      const handlers: any[] = this.handlersMap[eventClassName]
      for (let handler of handlers) {
        handler(event)
      }
    }
  }
}
