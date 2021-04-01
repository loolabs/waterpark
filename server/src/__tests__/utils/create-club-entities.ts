import { ClubEntity } from '../../shared/infra/db/entities/club.entity'

export const createMockClubEntities = (): ClubEntity[] => {
  const clubs: Array<ClubEntity> = []
  for (let i = 1; i <= 3; ++i) {
    const clubEntity = new ClubEntity()
    clubEntity.name = `Club Name ${i}`
    clubEntity.description = `Club Description ${i}`
    clubEntity.size = 100
    clubEntity.bannerImage = `Club Banner ${i}`
    clubEntity.iconImage = `Club Icon ${i}`
    clubEntity.facebook = `Facebook ${i}`
    clubEntity.twitter = `Twitter ${i}`
    clubEntity.instagram = `Instagram ${i}`
    clubEntity.website = `Website ${i}`
    clubs.push(clubEntity)
  }
  return clubs
}
