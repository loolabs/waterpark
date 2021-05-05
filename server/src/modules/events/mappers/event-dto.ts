import { BasicClub } from '../domain/entities/event'

export interface EventDTO {
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
