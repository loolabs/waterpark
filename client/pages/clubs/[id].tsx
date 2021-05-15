import React from 'react'
import { useAppContext } from '../../context'
import { useRouter } from 'next/router'
import { ClubInfo, EventsHostedByClub } from '../../components/club-details'
import { Banner } from '../../components/Banner'
import { Container } from '../../components/DetailContainer'

export default function ClubDetail() {
  const { clubs } = useAppContext()
  const router = useRouter()

  const { id } = router.query
  if (typeof id !== 'string') return null

  const club = clubs.get(parseInt(id))

  return (
    <div>
      <Banner backgroundImageUrl={club.links.bannerImage} />
      <Container>
        <ClubInfo club={club} />
        <EventsHostedByClub events={club.events} />
      </Container>
    </div>
  )
}
