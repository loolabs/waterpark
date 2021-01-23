import { Club } from '../../../../domain/entities/club'

export const createMockClubs = (): Array<Club> => {
  
  const clubs: Array<Club> =[]
  for (let _i = 1; _i <= 3; ++_i){
    const clubResult = Club.create({
        name: `Club Name ${_i}`,
        description: `Club Description ${_i}`
  })

  if (clubResult.isErr()) throw new Error('Something went wrong with Club creation')
  clubs.push(clubResult.value)
  }
  

  return clubs
}

