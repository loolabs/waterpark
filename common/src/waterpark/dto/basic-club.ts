import * as t from 'io-ts'

export interface BasicClub {
  id: string
  name: string
  iconImage: string
}

export const tBasicClub: t.Type<BasicClub> = t.strict({
  id: t.string,
  name: t.string,
  iconImage: t.string,
})
