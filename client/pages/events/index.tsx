import React from 'react'
import { EventViewToggle } from '../../components/events'
import { useAppContext } from '../../context'
import { Event } from '../../utils'

export const EVENT_MAP_KEY_FORMAT = 'YYYY-MM-DD'

export interface FilteredEvents {
  filteredEventsDateMap: Map<string, Array<Event>>
  dateOrder: Array<string>
}

export default function Events() {
  const { events } = useAppContext()
  const filteredEventsArray = Array.from(events.values())

  //this requires that filteredEventsArray is in sorted order (with respect to event startDate)
  const filteredEventsDateMap: Map<string, Array<Event>> = new Map()

  for (const event of filteredEventsArray) {
    const formattedEventDate = event.startTime.format(EVENT_MAP_KEY_FORMAT)
    if (filteredEventsDateMap.has(formattedEventDate)) {
      filteredEventsDateMap.get(formattedEventDate).push(event)
    } else {
      filteredEventsDateMap.set(formattedEventDate, [event])
    }
  }

  const filteredEvents: Map<string, Array<Event>> = filteredEventsDateMap

  return <EventViewToggle events={filteredEvents} />
}
