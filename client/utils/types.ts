import { Moment } from 'moment-timezone'

export type Id = number

export interface Club {
  id: Id
  name: string
  description: string
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

export interface BasicClub {
  name: string
  iconURL: string
}

export interface Event {
  id: Id
  name: string
  club: BasicClub
  description: string
  bannerImageURL: string
  startTime: Moment
  endTime: Moment
  tags: Array<string>
}

export interface BasicEvent {
  name: string
  startTime: Moment
  endTime: Moment
  bannerImageURL?: string
  tags: Array<string>
}
