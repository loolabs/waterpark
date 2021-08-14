import React from 'react'
import { useAppContext } from '../../context'
import { ResourceList } from '../../components/resource'
import Head from 'next/head'

export default function Housing() {
  const { houses } = useAppContext()

  return (
    <>
      <Head>
        <title>Explore Housing | Waterpark</title>
      </Head>
      <ResourceList resources={houses} slug={'housing'} />
    </>
  )
}
