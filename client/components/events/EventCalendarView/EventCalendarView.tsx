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
  dayShortform: string
}

const daysOfWeek: Array<DaySignature> = [
  {dayNumber: 1, dayShortform: "Mon" }, //Monday
  {dayNumber: 2, dayShortform: "Tue" }, //Tuesday
  {dayNumber: 3, dayShortform: "Wed" }, //Wednesday
  {dayNumber: 4, dayShortform: "Thu" }, //Thursday
  {dayNumber: 5, dayShortform: "Fri" }, //Friday
  {dayNumber: 6, dayShortform: "Sat" }, //Saturday
  {dayNumber: 0, dayShortform: "Sun" }, //Sunday
]

const CalendarView = styled.div<any>`
  display: flex; 
`

const CalendarColumnContainer = styled.div<any>`
  display: flex; 
  justify-content: flex-start;
  flex-wrap: wrap;
`

const CalendarSpacer = styled.div<any>`
  flex: 0 0 200px;
  @media ${device.laptop} {
    display: none;
  }
`

const CalendarColumn = styled.div<any>`
  min-width: 180px;

  @media ${device.mobileL} {
    min-width: 120px;
  }
`

const CalendarColumnHeader = styled.h3<any>`
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
          {day.dayShortform.toLocaleUpperCase()}
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