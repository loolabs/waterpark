import React from 'react'
import { useRouter } from 'next/router'
import { Club } from '../../context'
import styled from 'styled-components'

interface ClubCardProps {
  club: Club
}

const ClubCardContainer = styled.div`
  border-radius: 6px;
  overflow: hidden;
  max-width: 450px;
`

const ClubCardHeader = styled.div<{ backgroundImage: string }>`
  width: 100%;
  height: 0;
  padding-top: calc(100% / (64 / 27));
  background-image: url(${({ backgroundImage }) => backgroundImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

const ClubCardContent = styled.div`
  margin: 3%;
  height: 200px;
`

export const ClubCard = ({ club }: ClubCardProps) => {
  const { id, name, description, iconURL } = club
  const router = useRouter()

  const handleClick = () => {
    router.push({ pathname: `/clubs/${id}` })
  }

  return (
    <ClubCardContainer onClick={handleClick}>
      <ClubCardHeader backgroundImage={iconURL}></ClubCardHeader>
      <ClubCardContent>
        <h1>{name}</h1>
        <p>{description}</p>
      </ClubCardContent>
    </ClubCardContainer>
  )
}
