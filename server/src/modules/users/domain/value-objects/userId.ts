import { Result } from '../../../../shared/core/result'
import { Entity } from '../../../../shared/domain/entity'
import { UniqueEntityID } from '../../../../shared/domain/unique-entity-id'

// UserId IS-A Entity because we compare UserId's not by structural properties by but id
export class UserId extends Entity<any> {
  public static create(id?: UniqueEntityID): Result<UserId, Error> {
    return Result.ok(new UserId(id))
  }

  private constructor(id?: UniqueEntityID) {
    super(null, id)
  }

  get id(): UniqueEntityID {
    return this._id
  }
}
