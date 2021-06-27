import * as t from 'io-ts'
import { BasicEvent, tBasicEvent } from './basic-event'

export interface Club {
  id: string
  name: string
  description: string
  size: number
  links: {
    bannerImage: string
    iconImage: string
    facebook?: string
    twitter?: string
    instagram?: string
    website?: string
  }
  tags: Array<string>
  events: Array<BasicEvent>
}

const tClubLinks: t.Type<Club['links']> = t.intersection([
  t.strict({
    bannerImage: t.string,
    iconImage: t.string,
  }),
  t.partial({
    facebook: t.string,
    twitter: t.string,
    instagram: t.string,
    website: t.string,
  }),
])

export const tClub: t.Type<Club> = t.strict({
  id: t.string,
  name: t.string,
  description: t.string,
  size: t.number,
  links: tClubLinks,
  tags: t.array(t.string),
  events: t.array(tBasicEvent),
})
