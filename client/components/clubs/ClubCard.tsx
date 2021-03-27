import React from 'react'
import { useRouter } from 'next/router'
import { Club } from '../../context'
import styled from 'styled-components'
import { colours, desktopFontSize } from '../../styles'

interface ClubCardProps {
  club: Club
}

const ClubCardContainer = styled.div`
  border-radius: 6px;
  overflow: hidden;
  max-width: 450px;
  box-shadow: 0px 4px 4px 1px ${colours.neutralLight1};
  margin: 20px;
`

const ClubCardBanner = styled.div<{ bannerImageURL: string }>`
  width: 100%;
  height: 0;
  padding-top: calc(100% / (64 / 27));
  background-image: url(${({ bannerImageURL }) => bannerImageURL});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

const ClubCardContent = styled.div`
  margin: 30px;
  height: 200px;
`

const ClubCardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const ClubCardName = styled.h2`
  margin: 0 20px 0 0;
  flex-grow: 1;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
`

const ClubCardIcon = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`

export const ClubCard = ({ club }: ClubCardProps) => {
  const { id, name, description, iconURL, bannerImageURL } = club
  const router = useRouter()

  const handleClick = () => {
    router.push({ pathname: `/clubs/${id}` })
  }

  return (
    <ClubCardContainer onClick={handleClick}>
      <ClubCardBanner bannerImageURL={bannerImageURL}></ClubCardBanner>
      <ClubCardContent>
        <ClubCardHeader>
          <ClubCardName>{name}</ClubCardName>
          <ClubCardIcon src={iconURL} size="50px"></ClubCardIcon>
        </ClubCardHeader>
        <p>{description}</p>
      </ClubCardContent>
    </ClubCardContainer>
  )
}
