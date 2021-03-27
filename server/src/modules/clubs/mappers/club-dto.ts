export interface BasicEventDTO {
  name: string
  startTime: string
  endTime: string
  bannerURL?: string
  tags: Array<string>
}

export interface ClubDTO {
  name: string
  description: string
  bannerURL?: string
  iconURL: string
  facebookLink?: string
  twitterLink?: string
  instagramLink?: string
  websiteLink?: string
  tags: Array<string>
  events: Array<BasicEventDTO>
}
