import { Moment } from 'moment-timezone'

type URL = string

export interface Resource {
  id: Id
  resourceSlug: 'housing' | 'study-spots' | 'washrooms'
  name: string
  description: string
  location: string
  links: {
    bannerImage: URL
    iconImage: URL
  }
  galleryImages: Array<URL>
  overallRating: number
  review: Array<{
    comment: string
    rating: number
  }>
}

export interface House extends Resource {}

export interface StudySpot extends Resource {}

export interface Washroom extends Resource {}

export type Id = number

export interface Review {
  avatarImage: string
  comment: string
  rating: number
}
