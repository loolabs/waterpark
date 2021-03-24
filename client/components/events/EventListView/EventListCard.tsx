import React from 'react'
import { useRouter } from 'next/router'
import { Event } from '../../../context'

interface EventProps {
  event: Event
}

export const EventListCard = ({ event }: EventProps) => {
  const { id, name, description } = event
  const router = useRouter()

  const handleClick = () => {
    router.push({ pathname: `/events/${id}` })
  }

  return (
    <div onClick={handleClick}>
      <h1>{name}</h1>
      <p>{description}</p>
    </div>
  )
}

export default EventListCard