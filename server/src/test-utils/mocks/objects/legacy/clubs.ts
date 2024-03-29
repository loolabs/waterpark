import { UniqueEntityID } from '../../../../shared/domain/unique-entity-id'
import { Club } from '../../../../modules/legacy/clubs/domain/entities/club'
import { ClubDTO } from '../../../../modules/legacy/clubs/mappers/club-dto'
import { ClubEntity } from '../../../../shared/infra/db/entities/legacy/club.entity'

export function mockClub(id: string): Club {
  const clubResult = Club.create(
    {
      name: `Club Name ${id}`,
      description: `Club Description ${id}`,
      size: 30,
      links: {
        bannerImage: `Club Banner ${id}`,
        iconImage: `Club Icon ${id}`,
        facebook: `Facebook ${id}`,
        twitter: `Twitter ${id}`,
        instagram: `Instagram ${id}`,
        website: `Website ${id}`,
      },
      tags: ['tag1', 'tag2', 'tag3'],
      events: [
        {
          id: new UniqueEntityID(id),
          name: 'Event Name 1',
          startTime: new Date('2021-01-01'),
          endTime: new Date('2021-01-01'),
          bannerImage: 'Event Banner',
          tags: ['tags'],
        },
      ],
    },
    new UniqueEntityID(id)
  )

  if (clubResult.isErr()) throw clubResult.error
  return clubResult.value
}

export function mockClubDTO(id: string): ClubDTO {
  return {
    id: id,
    name: `Club Name ${id}`,
    description: `Club Description ${id}`,
    size: 30,
    links: {
      bannerImage: `Club Banner ${id}`,
      iconImage: `Club Icon ${id}`,
      facebook: `Facebook ${id}`,
      twitter: `Twitter ${id}`,
      instagram: `Instagram ${id}`,
      website: `Website ${id}`,
    },
    tags: ['tag1', 'tag2', 'tag3'],
    events: [
      {
        id: id,
        name: 'Event Name 1',
        startTime: '2021-01-01T00:00:00.000Z',
        endTime: '2021-01-01T00:00:00.000Z',
        bannerImage: 'Event Banner',
        tags: ['tags'],
      },
    ],
  }
}

export function mockClubEntity(id: string): ClubEntity {
  const clubEntity = new ClubEntity()
  clubEntity.name = `Club Name ${id}`
  clubEntity.description = `Club Description ${id}`
  clubEntity.size = 30
  clubEntity.bannerImage = `Club Banner ${id}`
  clubEntity.iconImage = `Club Icon ${id}`
  clubEntity.facebook = `Facebook ${id}`
  clubEntity.twitter = `Twitter ${id}`
  clubEntity.instagram = `Instagram ${id}`
  clubEntity.website = `Website ${id}`
  return clubEntity
}
