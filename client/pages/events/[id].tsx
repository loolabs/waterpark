import React from 'react'
import { useRouter } from 'next/router'
import { useAppContext } from '../../context'
import { Banner } from '../../components/Banner'
import { Container } from '../../components/DetailContainer'
import { EventInfo } from '../../components/event-details'
import { SimilarEvents } from '../../components/event-details/SimilarEvents'

export default function EventDetail() {
  const { events } = useAppContext()
  const router = useRouter()

  const { id } = router.query
  if (typeof id !== 'string') return null

  const event = events.get(parseInt(id))

  return (
    <div>
      <Banner backgroundImageUrl={event.bannerImageURL} />
      <Container>
        <EventInfo event={event} />
        <SimilarEvents allEvents={events} event={event} />
      </Container>
    </div>
  )
}
