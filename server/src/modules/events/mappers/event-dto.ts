export interface EventDTO {
  name: string
  description: string
  url: string
  startTime: Date
  endTime: Date
  facebookLink: string
  twitterLink: string
  instagramLink: string
  websiteLink: string
  backgroundImageURL: string
  tags: Array<string>
}
