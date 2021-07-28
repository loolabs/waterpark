import { Moment } from 'moment-timezone'

type URL = string

// Maps resource slugs to arrays of review rating criteria
export const RatingCriteria: { [key: string]: Array<string> } = {
  housing: ['cleanliness', 'price', 'management'],
  'study-spots': ['cleanliness', 'noise'],
  washrooms: ['cleanliness'],
}

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
  reviews: Array<Review>
}

export interface House extends Resource {
  resourceSlug: 'housing'
  reviews: Array<HousingReview>
}

export interface StudySpot extends Resource {
  resourceSlug: 'study-spots'
  reviews: Array<StudySpotReview>
}

export interface Washroom extends Resource {
  resourceSlug: 'washrooms'
  reviews: Array<WashroomReview>
}

export type Id = number

export enum Faculty {
  Mathematics = 'Mathematics',
  Engineering = 'Engineering',
  Arts = 'Arts',
  Health = 'Health',
  Science = 'Science',
  Environment = 'Environment',
  NonWaterloo = 'Non-Waterloo',
}

export enum Status {
  U1 = 'First-Year Student',
  U2 = 'Second-Year Student',
  U3 = 'Third-Year Student',
  U4 = 'Fourth-Year Student',
  U5 = 'Fifth-Year Student',
  U6Plus = 'Sixth-Year+ Student',
  Masters = "Master's Student",
  PhD = 'PhD Student',
  Faculty = 'Faculty Member',
  Other = 'Reviewer',
}

export interface Review {
  avatarImage: string
  comment: string
  timestamp: Date
  faculty: Faculty
  status: Status
  ratings: { [name: string]: number }
}

export interface HousingReview extends Review {
  ratings: {
    cleanliness: number
    price: number
    management: number
  }
}

export interface StudySpotReview extends Review {
  ratings: {
    cleanliness: number
    noise: number
  }
}

export interface WashroomReview extends Review {
  ratings: {
    cleanliness: number
  }
}
