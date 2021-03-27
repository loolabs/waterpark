import { ClubEntity } from '../../shared/infra/db/entities/club.entity'

export const createMockClubEntities = (): ClubEntity[] => {
  const clubs: Array<ClubEntity> = []
  for (let i = 1; i <= 3; ++i) {
    const clubEntity = new ClubEntity()
    clubEntity.name = `Club Name ${i}`
    clubEntity.description = `Club Description ${i}`
    clubEntity.size = 100
    clubEntity.bannerURL = `Club Banner ${i}`
    clubEntity.iconURL = `Club Icon ${i}`
    clubEntity.facebookLink = `Facebook ${i}`
    clubEntity.twitterLink = `Twitter ${i}`
    clubEntity.instagramLink = `Instagram ${i}`
    clubEntity.websiteLink = `Website ${i}`
    clubs.push(clubEntity)
  }
  return clubs
}
