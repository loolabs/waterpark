export class Identifier<T> {
  constructor(private value: T) {
    this.value = value
  }

  equals(id?: Identifier<T>): boolean {
    if (id === null || id === undefined) return false
    if (!(id instanceof this.constructor)) return false

    return id.toValue() === this.value
  }

  toString() {
    return String(this.value)
  }

  /**
   * @method toValue
   * @desc Returns the raw value of the identifier (could be something other than a string)
   */
  toValue(): T {
    return this.value
  }
}
