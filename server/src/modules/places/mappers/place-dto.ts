export interface PlaceDTO {
  name: string
  description: string
  address: string
  onCampus: boolean
  links: {
    url?: string
    bannerImage: string
    iconImage: string
  }
  tags: Array<string>

  //TODO reviews
  // reviews = new Collection<ReviewEntity>(this);
}
