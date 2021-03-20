import { ClubDTO } from '../../../../mappers/club-map'

export const createMockClubDTOs = (): Array<ClubDTO> => {
  const clubs: Array<ClubDTO> = []
  for (let i = 1; i <= 3; ++i) {
    clubs.push({
      name: `Club Name ${i}`,
      description: `Club Description ${i}`,
      backgroundImageURL: `Club Background ${i}`,
      iconURL: `Club Icon ${i}`,
      facebookLink: `Facebook ${i}`,
      twitterLink: `Twitter ${i}`,
      instagramLink: `Instagram ${i}`,
      websiteLink: `Website ${i}`,
      tags: ['tag1', 'tag2', 'tag3'],
      events: [
        {
          name: 'Event Name 1',
          startTime: '2021-01-01T00:00:00.000Z',
          endTime: '2021-01-01T00:00:00.000Z',
          backgroundImageURL: 'Event Background',
          tags: ['tags'],
        },
      ],
    })
  }
  return clubs
}
