import React from 'react'
import { useAppContext } from '../../context'
import { ResourceList } from '../../components/resource'

export default function Housing() {
  const { houses } = useAppContext()

  return <ResourceList resources={houses} />
}
