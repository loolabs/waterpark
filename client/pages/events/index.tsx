import React from 'react'
import { useAppContext } from '../../context'
import { EventList } from '../../components/events'

export default function Events() {
  const { events } = useAppContext()

  return <EventList events={events} />
}
