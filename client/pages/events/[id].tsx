import React from 'react'
import { useRouter } from 'next/router'
import { useAppContext } from '../../context'
import { Banner } from '../../components/Banner'
import { Container } from '../../components/DetailContainer'
import { EventInfo } from '../../components/event-details'

// interface Event {
//   id: Id
//   name: string
//   club: BasicClub
//   description: string
//   backgroundImageURL: string
//   startDate: Moment
//   endDate: Moment
//   tags: Array<string>
// }

export default function EventDetail() {
  const { events } = useAppContext()
  const router = useRouter()

  const { id } = router.query
  if (typeof id !== 'string') return null

  const event = events.get(parseInt(id))

  return (
    <div>
      <Banner backgroundImageUrl={event.backgroundImageURL} />
      <Container>
        <EventInfo event={event} />
      </Container>
    </div>
  )
}
