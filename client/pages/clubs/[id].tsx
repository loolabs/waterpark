import React from 'react'
import styled from 'styled-components'
import { useAppContext } from '../../context'
import { useRouter } from 'next/router'
import { ClubInfo, EventsHostedByClub } from '../../components/club-details'

const mobile = `425px`
const tablet = `768px`

const largerThan = (size: string): string => `(min-width: ${size})`

interface BannerProps {
  backgroundImageUrl: string
}

const Banner = styled.div<BannerProps>`
  background-image: url(${({ backgroundImageUrl }) => backgroundImageUrl || ''});
  background-position: center;
  height: 20vh;

  @media ${largerThan(tablet)} {
    height: 30vh;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto 100px;

  width: 85%;

  @media ${largerThan(mobile)} {
    width: 65%;
  }
`

export default function ClubDetail() {
  const { clubs } = useAppContext()
  const router = useRouter()

  const { id } = router.query
  if (typeof id !== 'string') return null

  const club = clubs.get(parseInt(id))

  return (
    <div>
      <Banner backgroundImageUrl={club.backgroundImageURL} />
      <Container>
        <ClubInfo club={club} />
        <EventsHostedByClub events={club.events} />
      </Container>
    </div>
  )
}
