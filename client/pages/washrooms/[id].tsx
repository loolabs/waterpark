import React from 'react'
import { useAppContext } from '../../context'
import { useRouter } from 'next/router'
import { ResourceInfo } from '../../components/club-details'
import { Banner } from '../../components/Banner'
import { Container } from '../../components/DetailContainer'

export default function WashroomDetail() {
  const { washrooms } = useAppContext()
  const router = useRouter()

  const { id } = router.query
  if (typeof id !== 'string') return null

  const washroom = washrooms.get(parseInt(id))

  return (
    <div>
      <Banner backgroundImageUrl={washroom.links.bannerImage} />
      <Container>
        <ResourceInfo resource={washroom} />
      </Container>
    </div>
  )
}
