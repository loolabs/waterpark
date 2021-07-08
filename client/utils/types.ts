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
  gallery: Array<URL>
  overallRating: number
}

export interface House extends Resource {
  resourceSlug: 'housing'
  reviews: Array <HousingReview>
}

export interface StudySpot extends Resource {
  resourceSlug: 'study-spots'
  reviews: Array <StudySpotReview>
}

export interface Washroom extends Resource {
  resourceSlug: 'washrooms'
  reviews: Array <WashroomReview>
}

export type Id = number

export interface Review {
  avatarImage: string
  comment: string
}

export interface HousingReview extends Review {
  ratings: {
    cleaniness: number
    price: number
    management: number
  }
}

export interface StudySpotReview extends Review {
  ratings: {
    cleaniness: number
    noise: number
  }
}

export interface WashroomReview extends Review {
  ratings: {
    cleaniness: number
  }
}

