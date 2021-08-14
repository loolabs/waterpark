import React from 'react'
import { useAppContext } from '../../context'
import { ResourceList } from '../../components/resource'

export default function StudySpots() {
  const { studySpots } = useAppContext()

  return <ResourceList resources={studySpots} slug={'study-spots'} />
}
