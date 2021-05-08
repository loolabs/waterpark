import React from 'react'
import { EventViewToggle } from '../../components/events'
import { useAppContext } from '../../context'
import { Event } from '../../context'

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
  const dateOrder: Array<string> = []
  for (const event of filteredEventsArray){
    const formattedEventDate = event.startDate.format(EVENT_MAP_KEY_FORMAT)
    if (filteredEventsDateMap[formattedEventDate]){
      filteredEventsDateMap[formattedEventDate].push(event)
    } else {
      filteredEventsDateMap[formattedEventDate] = [event];
      dateOrder.push(formattedEventDate)
    }
  }

  const filteredEvents: FilteredEvents = {
    filteredEventsDateMap, dateOrder
  }
  
  return <EventViewToggle filteredEvents={filteredEvents}/>
}
