export interface BasicClubDTO {
  id: string
  name: string
  iconImage: string
}
export interface EventDTO {
  id: string
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
  clubs: Array<BasicClubDTO>
}
