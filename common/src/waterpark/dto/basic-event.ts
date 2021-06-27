import * as t from 'io-ts'

export interface BasicEvent {
  id: string
  name: string
  startTime: string
  endTime: string
  bannerImage?: string
  tags: Array<string>
}

export const tBasicEvent: t.Type<BasicEvent> = t.intersection([
  t.strict({
    id: t.string,
    name: t.string,
    startTime: t.string,
    endTime: t.string,
    tags: t.array(t.string),
  }),
  t.partial({
    bannerImage: t.string,
  }),
])
