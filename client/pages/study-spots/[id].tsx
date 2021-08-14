import React from 'react'
import { useAppContext } from '../../context'
import { useRouter } from 'next/router'
import { ResourceInfo } from '../../components/resource-details'
import { Banner } from '../../components/Banner'
import { Container } from '../../components/DetailContainer'
import Head from 'next/head'

export default function StudySpotDetail() {
  const { studySpots } = useAppContext()
  const router = useRouter()

  const { id } = router.query
  if (typeof id !== 'string') return null

  const studySpot = studySpots.get(parseInt(id))

  return (
    <div>
      <Head>
        <title>{studySpot.name} | Waterpark</title>
      </Head>
      <Banner backgroundImageUrl={studySpot.links.bannerImage} />
      <Container>
        <ResourceInfo resource={studySpot} />
      </Container>
    </div>
  )
}
