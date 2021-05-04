import  { EventListCard } from './EventListCard'
import { Id, Event } from '../../../context'
import styled from 'styled-components'
import { colours, device, fontWeight, desktopFontSize, mobileFontSize } from '../../../styles'

interface EventViewProps {
  filteredEvents: Array<Event>
}

const ListView = styled.div`
  width: 100%;
`

const ListViewRow = styled.div`
  display: block;
  @media not all and ${device.tablet} {
    display: flex;
  }
`

const ListViewDate = styled.div`
  font-weight: bold;
  font-size: ${desktopFontSize.subtitle2};
  flex-shrink: 0;
  flex-basis: 200px;
  color: ${colours.neutralDark1};
  margin-bottom: 15px;
  @media not all and ${device.tablet} {
    margin-bottom: 0;
  }
`

export const EventListView = ({ filteredEvents }: EventViewProps) => {
  
  const getDateLabelIfNecessary = (index: number, allEvents: Event[]) => {
    if(index == 0 || !(allEvents[index-1].startDate.isSame(allEvents[index].startDate, 'day'))){
      //Format: THU, NOV 17TH
      return allEvents[index].startDate.format('ddd, MMM Do').toLocaleUpperCase();
    }
    return null;
  }

  return (
    <ListView> 
      {filteredEvents.map((event, index, allEvents) => (
        <ListViewRow key={`list-view-row-${event.id}`}>
          <ListViewDate>
            {getDateLabelIfNecessary(index, allEvents)}
          </ListViewDate>
          <EventListCard key={`event-list-card-${event.id}`} event={event} />
        </ListViewRow>
      ))}
    </ListView>
  )
}
