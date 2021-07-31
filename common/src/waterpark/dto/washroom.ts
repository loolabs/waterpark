import * as t from 'io-ts'

export interface Washroom {
  id: string
  name: string
  // TODO: the rest
}

export const tWashroom: t.Type<Washroom> = t.strict({
  id: t.string,
  name: t.string,
  // TODO: the rest
})
