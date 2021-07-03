import React from 'react'
import { useAppContext } from '../../context'
import { HousingList } from '../../components/housing'

export default function Housing() {
  const { houses } = useAppContext()

  return <HousingList houses={houses} />
}
