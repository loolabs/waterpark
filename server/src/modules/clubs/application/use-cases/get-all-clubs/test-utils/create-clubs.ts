import { Club } from '../../../../domain/entities/club'

export const createMockClubs = (): Array<Club> => {
  
  const clubs: Array<Club> =[]
  for (let i = 1; i <= 3; ++i){
    const clubResult = Club.create({
        name: `Club Name ${i}`,
        description: `Club Description ${i}`
  })

  if (clubResult.isErr()) throw new Error('Something went wrong with Club creation')
  clubs.push(clubResult.value)
  }
  

  return clubs
}

