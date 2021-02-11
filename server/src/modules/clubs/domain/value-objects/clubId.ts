import { Result } from '../../../../shared/core/result'
import { Entity } from '../../../../shared/domain/entity'
import { UniqueEntityID } from '../../../../shared/domain/unique-entity-id'

// ClubId IS-A Entity because we compare ClubId's not by structural properties but by id
export class ClubId extends Entity<any> {
  public static create(id?: UniqueEntityID): Result<ClubId, Error> {
    return Result.ok(new ClubId(id))
  }

  private constructor(id?: UniqueEntityID) {
    super(null, id)
  }

  get id(): UniqueEntityID {
    return this._id
  }
}
