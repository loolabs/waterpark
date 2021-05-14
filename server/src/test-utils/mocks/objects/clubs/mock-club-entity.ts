import { ClubEntity } from '../../../../shared/infra/db/entities/club.entity'

const mockClubEntity = (id: string): ClubEntity => {
  const clubEntity = new ClubEntity()
  clubEntity.name = `Club Name ${id}`
  clubEntity.description = `Club Description ${id}`
  clubEntity.size = 100
  clubEntity.bannerImage = `Club Banner ${id}`
  clubEntity.iconImage = `Club Icon ${id}`
  clubEntity.facebook = `Facebook ${id}`
  clubEntity.twitter = `Twitter ${id}`
  clubEntity.instagram = `Instagram ${id}`
  clubEntity.website = `Website ${id}`
  return clubEntity
}

export { mockClubEntity }
