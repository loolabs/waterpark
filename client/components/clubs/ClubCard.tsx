import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { TAGS, TagGroup, TagRow, TagBubble } from './Tag'
import { Club } from '../../utils'
import { colours } from '../../styles'

// Shared styled components that can probably be factored out later
const Icon = styled.img<{ size: string }>`
  border-radius: 4px;
  height: ${({ size }) => size};
  object-fit: cover;
  width: ${({ size }) => size};
`

const ClubCardContainer = styled.div`
  border-radius: 8px;
  overflow: hidden;
  width: 100%;

  // A subtle shadow around the card
  box-shadow: 0px 4px 4px 1px ${colours.neutralLight1};
`

const ClubCardBanner = styled.div<{ bannerImageURL: string }>`
  background-image: url(${({ bannerImageURL }) => bannerImageURL});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 0;
  padding-top: calc(100% / 3); // 3:1 aspect ratio
  width: 100%;
`

const ClubCardContent = styled.div`
  margin: 24px;
`

const ClubCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 56px;
  justify-content: space-between;
`

const ClubCardName = styled.h2`
  flex-grow: 1;
  font-size: 20px;
  margin-bottom: 0;
  margin-left: 0;
  margin-right: 16px;
  margin-top: 0;
  overflow: hidden;
  text-overflow: ellipsis;

  // Truncate overflowing text
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

const ClubCardDescription = styled.p`
  height: 64px;
  overflow: hidden;
  position: relative;
  margin-bottom: 24px;
  margin-top: 16px;

  // Truncate overflowing text with an ellipse
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`

const RightSpaceWrapper = styled.div`
  margin-right: 16px;
`

const ClubCardTag = (tag: string) => {
  if (TAGS.has(tag)) {
    const { text, colour } = TAGS.get(tag)
    return (
      <RightSpaceWrapper key={text}>
        <TagBubble colour={colour}>{text}</TagBubble>
      </RightSpaceWrapper>
    )
  } else {
    return (
      <RightSpaceWrapper key={tag}>
        <TagBubble>{tag}</TagBubble>
      </RightSpaceWrapper>
    )
  }
}

interface ClubCardProps {
  club: Club
}

export const ClubCard = ({ club }: ClubCardProps) => {
  const { id, name, description, links, tags } = club
  const router = useRouter()

  const handleClick = () => {
    router.push({ pathname: `/clubs/${id}` })
  }

  return (
    <ClubCardContainer onClick={handleClick}>
      <ClubCardBanner bannerImageURL={links.bannerImage}></ClubCardBanner>
      <ClubCardContent>
        <ClubCardHeader>
          <ClubCardName>{name}</ClubCardName>
          <Icon src={links.iconImage} size="56px"></Icon>
        </ClubCardHeader>
        <ClubCardDescription>{description}</ClubCardDescription>
        <TagRow>
          <TagGroup>{tags.map(ClubCardTag)}</TagGroup>
        </TagRow>
      </ClubCardContent>
    </ClubCardContainer>
  )
}
