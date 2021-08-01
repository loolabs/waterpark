import React from 'react'
import { useAppContext } from '../../context'
import { ResourceList } from '../../components/resource'

export default function Washrooms() {
  const { washrooms } = useAppContext()

  return <ResourceList resources={washrooms} slug={'washrooms'} />
}
