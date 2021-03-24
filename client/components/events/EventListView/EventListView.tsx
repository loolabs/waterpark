import { EventListCard } from './EventListCard'
import { Id, Event } from '../../../context'
import styled from 'styled-components'

interface EventViewProps {
  filteredEvents: Array<Event>
}

const ListView = styled.div<any>`
  width: 1050px;
`

export const EventListView = ({ filteredEvents }: EventViewProps) => {

  return (
    <ListView>
      {filteredEvents.map((event) => (
        <EventListCard key={event.id} event={event} />
      ))}
    </ListView>
  )
}

export default EventListView
