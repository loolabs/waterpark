export interface BasicEventDTO {
  id: string
  name: string
  startTime: string
  endTime: string
  bannerImage?: string
  tags: Array<string>
}

export interface ClubDTO {
  id: string
  name: string
  description: string
  size: number
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
