import React from 'react'
import { EventViewToggle } from '../../components/events'
import { useAppContext } from '../../context'

export default function Events() {
  const { events } = useAppContext()
  const filteredEvents = [];
  events.forEach(event => filteredEvents.push(event))
  return <EventViewToggle filteredEvents={filteredEvents}/>
}
