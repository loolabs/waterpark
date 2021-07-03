import { Moment } from 'moment-timezone'

interface Resource {
  id: Id
  name: string
  description: string
  location: string
  // links: {
  //   bannerImage: string
  //   iconImage: string
  // }
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
