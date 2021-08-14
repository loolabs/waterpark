import React from 'react'
import { useAppContext } from '../../context'
import { useRouter } from 'next/router'
import { ResourceInfo } from '../../components/resource-details'
import { Banner } from '../../components/Banner'
import { Container } from '../../components/DetailContainer'
import Head from 'next/head'

export default function HouseDetail() {
  const { houses } = useAppContext()
  const router = useRouter()

  const { id } = router.query
  if (typeof id !== 'string') return null

  const house = houses.get(parseInt(id))

  return (
    <div>
      <Head>
        <title>{house.name} | Waterpark</title>
      </Head>
      <Banner backgroundImageUrl={house.links.bannerImage} />
      <Container>
        <ResourceInfo resource={house} />
      </Container>
    </div>
  )
}
