import  { EventListCard } from './EventListCard'
import { Id, Event } from '../../../context'
import styled from 'styled-components'
import { colours, device, fontWeight, desktopFontSize, mobileFontSize } from '../../../styles'

interface EventViewProps {
  filteredEvents: Array<Event>
}

const ListView = styled.div<any>`
  width: 100%;
`

const ListViewRow = styled.div<any>`
  display: flex;
  @media ${device.tablet} {
    display: block;
  }
`

const ListViewDate = styled.div<any>`
  font-weight: bold;
  font-size: ${desktopFontSize.subtitle2};
  flex: 0 0 200px;
  color: ${colours.neutralDark1};
  @media ${device.tablet} {
    margin-bottom: 15px;
  }
`

export const EventListView = ({ filteredEvents }: EventViewProps) => {
  
  const getDateLabelIfNecessary = (index: number, allEvents: Event[]) => {
    if(index == 0 || !(allEvents[index-1].startDate.isSame(allEvents[index].startDate, 'day'))){
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
