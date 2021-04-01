export interface BasicEventDTO {
  name: string
  startTime: string
  endTime: string
  bannerImage?: string
  tags: Array<string>
}

export interface ClubDTO {
  name: string
  description: string
  links: {
    bannerImage: string
    iconImage: string
    facebook?: string
    twitter?: string
    instagram?: string
    website?: string
  }
  tags: Array<string>
  events: Array<BasicEventDTO>
}
