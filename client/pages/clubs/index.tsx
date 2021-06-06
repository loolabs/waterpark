import React from 'react'
import styled from 'styled-components'
import { useAppContext } from '../../context'
import { ClubList } from '../../components/clubs'

const PageContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

export default function Clubs() {
  const { clubs } = useAppContext()

  return (
    <PageContainer>
      <ClubList clubs={clubs} />
    </PageContainer>
  )
}
