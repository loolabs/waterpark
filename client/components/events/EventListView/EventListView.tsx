import { EventListCard } from './EventListCard'
import { Id, Event } from '../../../context'

interface EventViewProps {
  filteredEvents: Array<Event>
}

export const EventListView = ({ filteredEvents }: EventViewProps) => {

  return (
    <div>
      {filteredEvents.map((event) => (
        <EventListCard key={event.id} event={event} />
      ))}
    </div>
  )
}

export default EventListView
