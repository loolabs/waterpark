import React from 'react'
import { Event } from '../../../utils'
import styled from 'styled-components'
import moment from 'moment-timezone'
import { colours, device, fontWeight, desktopFontSize, mobileFontSize } from '../../../styles'
import { EventCalendarCard } from './EventCalendarCard'
import { EVENT_MAP_KEY_FORMAT } from '../../../pages/events'

interface EventViewProps {
  events: Map<string, Array<Event>>
}

interface DaySignature {
  dayNumber: number
  dayShortForm: string
}

const daysOfWeek: Array<DaySignature> = [
  { dayNumber: 0, dayShortForm: 'Mon' },
  { dayNumber: 1, dayShortForm: 'Tue' },
  { dayNumber: 2, dayShortForm: 'Wed' },
  { dayNumber: 3, dayShortForm: 'Thu' },
  { dayNumber: 4, dayShortForm: 'Fri' },
  { dayNumber: 5, dayShortForm: 'Sat' },
  { dayNumber: 6, dayShortForm: 'Sun' },
]

const CalendarView = styled.div`
  display: flex;
`

const CalendarColumnContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  overflow: auto;
  white-space: nowrap;
`

const CalendarSpacer = styled.div`
  flex-shrink: 0;
  flex-basis: 200px;
  @media ${device.laptop} {
    display: none;
  }
`

const CalendarColumnWrapper = styled.div`
  min-width: 180px;
`

const CalendarColumnHeader = styled.h3`
  color: ${colours.neutralDark1};
  font-weight: bold;
  font-size: ${desktopFontSize.h3};
  margin-bottom: 24px;
`

export const EventCalendarView = ({ events }: EventViewProps) => {
  const getEventsOnDay = (dayNumber: number) => {
    const weekDay = moment().startOf('isoWeek').add(dayNumber, 'days')
    //ensures events correspond to current week period starting at the last monday and ending at next sunday are selected
    return events.get(weekDay.format(EVENT_MAP_KEY_FORMAT))
  }

  const generateDayColumns = () =>
    daysOfWeek.map((day) => {
      const eventsOnDay = getEventsOnDay(day.dayNumber)
      return (
        <CalendarColumn key={`calendar-column-${day.dayNumber}`} day={day} events={eventsOnDay} />
      )
    })

  return (
    <CalendarView>
      <CalendarSpacer />
      <CalendarColumnContainer>{generateDayColumns()}</CalendarColumnContainer>
    </CalendarView>
  )
}

interface CalendarColumnProps {
  day: DaySignature
  events: Array<Event>
}

export const CalendarColumn = ({ day, events }: CalendarColumnProps) => (
  <CalendarColumnWrapper>
    <CalendarColumnHeader>{day.dayShortForm.toLocaleUpperCase()}</CalendarColumnHeader>
    {events &&
      events.map((event) => (
        <EventCalendarCard key={`event-calendar-card-${event.id}`} event={event} />
      ))}
  </CalendarColumnWrapper>
)
