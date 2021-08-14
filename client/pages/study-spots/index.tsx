import React from 'react'
import { useAppContext } from '../../context'
import { ResourceList } from '../../components/resource'
import Head from 'next/head'

export default function StudySpots() {
  const { studySpots } = useAppContext()

  return (
  <>
    <Head>
      <title>Explore Study Spots | Waterpark</title>
    </Head>
    <ResourceList resources={studySpots} slug={'study-spots'} />
  </>)
}
