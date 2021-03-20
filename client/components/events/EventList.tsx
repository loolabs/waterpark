import { useMemo } from 'react'
import { useSearch } from '../hooks'
import { EventCard } from './EventCard'
import { Id, Event } from '../../context'

interface EventListProps {
  events: Map<Id, Event>
}

export const EventList = ({ events }: EventListProps) => {
  const allEvents: Array<Event> = useMemo(() => Array.from(events.values()), [events])

  const [filteredEvents, setSearchValue] = useSearch(allEvents, ['name'])

  return (
    <div>
      <h1>Event List</h1>
      <div>
        <input onChange={(e) => setSearchValue(e.target.value)} />
      </div>
      {filteredEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}
