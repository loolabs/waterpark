import { useSearch } from '../hooks'
import { ClubCard } from './ClubCard'
import { Id, Club } from '../../context'
import { useMemo } from 'react'

interface ClubListProps {
  clubs: Map<Id, Club>
}

export const ClubList = ({ clubs }: ClubListProps) => {
  const allClubs: Array<Club> = useMemo(() => Array.from(clubs.values()), [clubs])

  const [filteredClubs, setSearchValue] = useSearch(allClubs, ['name'])

  return (
    <div>
      <h1>Club List</h1>
      <div>
        <input onChange={(e) => setSearchValue(e.target.value)} />
      </div>
      {filteredClubs.map((club) => (
        <ClubCard key={club.id} club={club} />
      ))}
    </div>
  )
}
