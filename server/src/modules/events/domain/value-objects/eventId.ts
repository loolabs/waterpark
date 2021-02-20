import { Result } from '../../../../shared/core/result'
import { Entity } from '../../../../shared/domain/entity'
import { UniqueEntityID } from '../../../../shared/domain/unique-entity-id'

// EventId IS-A Entity because we compare EventId's not by structural properties but by id
export class EventId extends Entity<any> {
  public static create(id?: UniqueEntityID): Result<EventId, Error> {
    return Result.ok(new EventId(id))
  }

  private constructor(id?: UniqueEntityID) {
    super(null, id)
  }

  get id(): UniqueEntityID {
    return this._id
  }
}
