import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { TAGS, Tag, TagGroup, TagRow } from './Tag'
import { Club } from '../../context'
import { colours } from '../../styles'

// Shared styled components that can probably be factored out later
const Icon = styled.img<{ size: string }>`
  height: ${({ size }) => size};
  object-fit: cover;
  width: ${({ size }) => size};
`

const ClubCardContainer = styled.div`
  border-radius: 6px;
  overflow: hidden;
  width: 100%;
  box-shadow: 0px 4px 4px 1px ${colours.neutralLight1};
`

const ClubCardBanner = styled.div<{ bannerImageURL: string }>`
  background-image: url(${({ bannerImageURL }) => bannerImageURL});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 0;
  padding-top: calc(100% / (64 / 27));
  width: 100%;
`

const ClubCardContent = styled.div`
  margin: 30px;
`

const ClubCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const ClubCardName = styled.h3`
  display: -webkit-box;
  flex-grow: 1;
  margin: 0 20px 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

const ClubCardDescription = styled.p`
  line-height: 20px;
  height: 60px;
`

const RightSpaceWrapper = styled.div`
  margin-right: 16px;
`
interface ClubCardProps {
  club: Club
}

export const ClubCard = ({ club }: ClubCardProps) => {
  const { id, name, description, iconURL, bannerImageURL, tags } = club
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
          <Icon src={iconURL} size="50px"></Icon>
        </ClubCardHeader>
        <ClubCardDescription>{description}</ClubCardDescription>
        <TagRow>
          <TagGroup>
            {tags.map((tag) => {
              if (!TAGS.has(tag)) {
                return (
                  <RightSpaceWrapper>
                    <Tag>{tag}</Tag>
                  </RightSpaceWrapper>
                )
              }
              const { text, colour } = TAGS.get(tag)
              return (
                <RightSpaceWrapper>
                  <Tag colour={colour}>{text}</Tag>
                </RightSpaceWrapper>
              )
            })}
          </TagGroup>
        </TagRow>
      </ClubCardContent>
    </ClubCardContainer>
  )
}
