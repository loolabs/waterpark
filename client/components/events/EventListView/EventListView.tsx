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
`

const ListViewDate = styled.div<any>`
  font-weight: bold;
  font-size: ${desktopFontSize.subtitle2};
  flex: 0 0 200px;
  color: ${colours.neutralDark1};
`

const ListViewSpacer = styled.div<any>`
  flex: 0 0 100px;
`

export const EventListView = ({ filteredEvents }: EventViewProps) => {
  
  const getDateLabelIfNecessary = (index: number, allEvents: Event[]) => {
    if(index == 0 || (allEvents[index-1].startDate != allEvents[index].startDate)){
      return allEvents[index].startDate.format('ddd, MMM Do').toLocaleUpperCase();
    }
    return null;
  }

  const getEventListCards = () => (
    filteredEvents.map((event, index, allEvents) => (
      <ListViewRow>
        <ListViewDate>
          {getDateLabelIfNecessary(index, allEvents)}
        </ListViewDate>
        <EventListCard key={event.id} event={event} />
        <ListViewSpacer/>
      </ListViewRow>
    ))
  )

  return (
    <ListView> 
      {getEventListCards()}
    </ListView>
  )
}
