import React from 'react'
import { useAppContext } from '../../context'
import { ClubList } from '../../components/clubs'

export default function Clubs() {
  const { clubs } = useAppContext()

  return <ClubList clubs={clubs} />
}
