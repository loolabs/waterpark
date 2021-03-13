
export interface BasicEventDTO {
  name: string
  startTime: string
  endTime: string
  backgroundImageURL: string | null
  tags: Array<string>
}

export interface ClubDTO {
  name: string
  description: string
  backgroundImageURL: string | null
  iconURL: string | null
  facebookLink: string | null
  twitterLink: string | null
  instagramLink: string | null
  websiteLink: string | null
  tags: Array<string>
  events: Array<BasicEventDTO>
}
