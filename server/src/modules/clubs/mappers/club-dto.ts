export interface BasicEventDTO {
  name: string
  startTime: string
  endTime: string
  backgroundImageURL?: string
  tags: Array<string>
}

export interface ClubDTO {
  name: string
  description: string
  backgroundImageURL?: string
  iconURL: string
  facebookLink?: string
  twitterLink?: string
  instagramLink?: string
  websiteLink?: string
  tags: Array<string>
  events: Array<BasicEventDTO>
}
