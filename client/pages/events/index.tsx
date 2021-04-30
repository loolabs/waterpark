import React from 'react'
import { EventViewToggle } from '../../components/events'
import { useAppContext } from '../../context'

export default function Events() {
  const { events } = useAppContext()
  const filteredEvents = Array.from(events.values())
  return <EventViewToggle filteredEvents={filteredEvents}/>
}
