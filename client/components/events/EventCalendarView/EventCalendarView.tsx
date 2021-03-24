import React from "react"
import moment from 'moment'
import { Event } from '../../../context'
import styled from 'styled-components'
import { colours, device, fontWeight, desktopFontSize, mobileFontSize } from '../../../styles'
import EventCalendarCard from './EventCalendarCard'

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
  justify-content: center;
`

const CalendarColumn = styled.div<any>`
  ${(props: any) => (props.dayNumber >= 1 && props.dayNumber <= 6) && `
    margin-right: 30px;
 `};
`

const CalendarColumnHeader = styled.h3<any>`
  color: ${colours.neutralDark1};
  font-weight: bold;
  font-size: ${desktopFontSize.h3};
  margin-bottom: 25px;
`

const EventCalendarView = ({ filteredEvents }: EventViewProps) => {

  const getEventsOnDay = (dayNumber: Number) => (
    filteredEvents.filter(event => moment(event.startDate).day() <= dayNumber && moment(event.endDate).day() >= dayNumber)
  )

  const getCalendarCards = (events: Array<Event>) => (
    events.map(event => <EventCalendarCard event={event}/>)
  )

  const generateDayColumns = () => (
    daysOfWeek.map(day => {
      const eventsOnDay = getEventsOnDay(day.dayNumber);
      const calendarCards = getCalendarCards(eventsOnDay);
      return <CalendarColumn>
        <CalendarColumnHeader>
          {day.dayShortform}
        </CalendarColumnHeader>
        {calendarCards}
      </CalendarColumn>
    })
  )

  return (
    <CalendarView>
      {generateDayColumns()}
    </CalendarView>
  );
};

export default EventCalendarView