import { UniqueEntityID } from './unique-entity-id'

export abstract class Entity<T> {
  protected readonly _id: UniqueEntityID
  public readonly props: T

  constructor(props: T, id?: UniqueEntityID) {
    this._id = id ? id : new UniqueEntityID()
    this.props = props
  }

  public equals(object?: Entity<T>): boolean {
    if (object == null || object == undefined) return false
    else if (!isEntity(object)) return false

    return this._id.equals(object._id)
  }
}

const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity
}
