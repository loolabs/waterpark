import * as t from 'io-ts'
import { BasicClub, tBasicClub } from './basic-club'

export interface Event {
  id: string
  name: string
  description: string
  startTime: string
  endTime: string
  links: {
    url?: string
    bannerImage: string
    facebook?: string
    twitter?: string
    instagram?: string
  }
  tags: Array<string>
  clubs: Array<BasicClub>
}

const tEventLinks: t.Type<Event['links']> = t.intersection([
  t.strict({
    bannerImage: t.string,
  }),
  t.partial({
    url: t.string,
    facebook: t.string,
    twitter: t.string,
    instagram: t.string,
  }),
])

export const tEvent: t.Type<Event> = t.strict({
  id: t.string,
  name: t.string,
  description: t.string,
  startTime: t.string,
  endTime: t.string,
  links: tEventLinks,
  tags: t.array(t.string),
  clubs: t.array(tBasicClub),
})
