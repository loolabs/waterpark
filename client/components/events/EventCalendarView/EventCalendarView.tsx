import React from "react"
import { Event } from '../../../context'
import styled from 'styled-components'
import moment from 'moment-timezone'
import { colours, device, fontWeight, desktopFontSize, mobileFontSize } from '../../../styles'
import { EventCalendarCard } from './EventCalendarCard'

interface EventViewProps {
  filteredEvents: Array<Event>
}

interface DaySignature {
  dayNumber: Number,
  dayShortForm: string
}

const daysOfWeek: Array<DaySignature> = [
  { dayNumber: 1, dayShortForm: "Mon" },
  { dayNumber: 2, dayShortForm: "Tue" },
  { dayNumber: 3, dayShortForm: "Wed" },
  { dayNumber: 4, dayShortForm: "Thu" },
  { dayNumber: 5, dayShortForm: "Fri" },
  { dayNumber: 6, dayShortForm: "Sat" },
  { dayNumber: 0, dayShortForm: "Sun" },
]

const CalendarView = styled.div`
  display: flex; 
`

const CalendarColumnContainer = styled.div`
  display: flex; 
  justify-content: flex-start;
  flex-wrap: wrap;
`

const CalendarSpacer = styled.div`
  flex: 0 0 200px;
  @media ${device.laptop} {
    display: none;
  }
`

const CalendarColumn = styled.div`
  min-width: 120px;
  @media not all and ${device.mobileL} {
    min-width: 180px;
  }
`

const CalendarColumnHeader = styled.h3`
  color: ${colours.neutralDark1};
  font-weight: bold;
  font-size: ${desktopFontSize.h3};
  margin-bottom: 25px;
`

export const EventCalendarView = ({ filteredEvents }: EventViewProps) => {

  const getEventsOnDay = (dayNumber: Number) => {
    const beginningOfWeek = moment().startOf('isoWeek');
    const endOfWeek = moment().startOf('isoWeek').add(6, 'days');
    //ensures events correspond to current week period starting at the last monday and ending at next sunday are selected
    return filteredEvents.filter(event => 
      event.startDate.isSameOrAfter(beginningOfWeek, 'day') 
      && event.startDate.isSameOrBefore(endOfWeek, 'day')
      && event.startDate.day() == dayNumber)
  }

  const getCalendarCards = (events: Array<Event>) => (
    events.map(event => <EventCalendarCard key={`event-calendar-card-${event.id}`} event={event}/>)
  )

  const generateDayColumns = () => (
    daysOfWeek.map(day => {
      const eventsOnDay = getEventsOnDay(day.dayNumber);
      const calendarCards = getCalendarCards(eventsOnDay);
      return <CalendarColumn key={`calendar-column-${day.dayNumber}`}>
        <CalendarColumnHeader>
          {day.dayShortForm.toLocaleUpperCase()}
        </CalendarColumnHeader>
        {calendarCards}
      </CalendarColumn>
    })
  )

  return (
    <CalendarView>
      <CalendarSpacer/>
      <CalendarColumnContainer>
        {generateDayColumns()}
      </CalendarColumnContainer>
    </CalendarView>
  )
}
