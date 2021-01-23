import { ClubDTO } from '../../../../mappers/club-dto'

export const createMockClubDTOs = (): Array<ClubDTO> => {
  
  const clubs: Array<ClubDTO> =[]
  for (let _i = 1; _i <= 3; ++_i){
    clubs.push({
          name: `Club Name ${_i}`,
          description: `Club Description ${_i}`
    })
  }
  return clubs
}