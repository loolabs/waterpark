import { BasicClub } from "../domain/entities/event";

export interface EventDTO {
  name: string
  description: string
  url: string | null
  startTime: string
  endTime: string
  facebookLink: string | null
  twitterLink: string | null
  instagramLink: string | null
  websiteLink: string | null
  backgroundImageURL: string | null
  tags: Array<string>
  clubs: Array<BasicClub>
}
