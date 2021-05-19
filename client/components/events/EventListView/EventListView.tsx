import { EventListCard } from './EventListCard'
import { Id, Event } from '../../../utils'
import styled from 'styled-components'
import { colours, device, fontWeight, desktopFontSize, mobileFontSize } from '../../../styles'
import { FilteredEvents } from '../../../pages/events'
import moment from 'moment'

interface EventViewProps {
  events: Map<string, Array<Event>>
}

const ListView = styled.div`
  width: 100%;
`

const ListViewSection = styled.div`
  display: block;
  @media not all and ${device.tablet} {
    display: flex;
  }
`

const ListViewItems = styled.div`
  width: 100%;
`

const ListViewDate = styled.div`
  font-weight: bold;
  font-size: ${desktopFontSize.subtitle2};
  flex-shrink: 0;
  flex-basis: 200px;
  color: ${colours.neutralDark1};
  margin-bottom: 16px;
  @media not all and ${device.tablet} {
    margin-bottom: 0;
  }
`

export const EventListView = ({ events }: EventViewProps) => {
  const getDateLabel = (date: string) => {
    //Format: THU, NOV 17TH
    return moment(date).format('ddd, MMM Do').toLocaleUpperCase()
  }

  //sort the dates in ascending order
  const datesArray = Array.from(events.keys()).sort((firstDate, secondDate) => {
    if (moment(firstDate) > moment(secondDate)) {
      return 1
    } else {
      return -1
    }
  })

  return (
    <ListView>
      {datesArray.map((date) => (
        <ListViewSection key={`list-view-row-${date}`}>
          <ListViewDate>{getDateLabel(date)}</ListViewDate>
          <ListViewItems>
            {events.get(date).map((event) => (
              <EventListCard key={`event-list-card-${event.id}`} event={event} />
            ))}
          </ListViewItems>
        </ListViewSection>
      ))}
    </ListView>
  )
}
