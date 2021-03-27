import { BasicClub } from "../domain/entities/event";

export interface EventDTO {
  name: string
  description: string
  url?: string
  startTime: string
  endTime: string
  facebookLink?: string
  twitterLink?: string
  instagramLink?: string
  websiteLink?: string
  bannerURL?: string
  tags: Array<string>
  clubs: Array<BasicClub>
}
