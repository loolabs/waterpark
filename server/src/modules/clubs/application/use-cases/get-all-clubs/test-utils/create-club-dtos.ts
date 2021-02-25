import { ClubDTO } from '../../../../mappers/club-dto'

export const createMockClubDTOs = (): Array<ClubDTO> => {
  const clubs: Array<ClubDTO> = []
  for (let i = 1; i <= 3; ++i) {
    clubs.push({
      name: `Club Name ${i}`,
      description: `Club Description ${i}`,
    })
  }
  return clubs
}
