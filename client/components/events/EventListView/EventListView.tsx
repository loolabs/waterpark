import { EventListCard } from './EventListCard'
import { Id, Event } from '../../../context'
import moment from 'moment'
import styled from 'styled-components'

interface EventViewProps {
  filteredEvents: Array<Event>
}

const ListView = styled.div<any>`
  width: 100%;
`

const ListViewRow = styled.div<any>`
  display: flex;
`

const ListViewDate = styled.div<any>`
  display: flex;
`

export const EventListView = ({ filteredEvents }: EventViewProps) => {
  
  const getDateLabelIfNecessary = (index: number, allEvents: Event[]) => {
    if(index == 0 || moment(allEvents[index-1].startDate) != moment(allEvents[index].startDate)){
      return moment(allEvents[index].startDate).format('ddd, MMM Do');
    }
    return null;
  }

  return (
    <ListView> 
      {filteredEvents.map((event, index, allEvents) => (
        <ListViewRow>
          <ListViewDate>
            {getDateLabelIfNecessary(index, allEvents)}
          </ListViewDate>
          <EventListCard key={event.id} event={event} />
        </ListViewRow>
      ))}
    </ListView>
  )
}

export default EventListView
