import React from 'react'
import { useAppContext } from '../../context'
import { ResourceList } from '../../components/resource'
import Head from 'next/head'

export default function Washrooms() {
  const { washrooms } = useAppContext()

  return (
  <>
    <Head>
      <title>Explore Washrooms | Waterpark</title>
    </Head>
    <ResourceList resources={washrooms} slug={'washrooms'} />
  </>
  )
}
