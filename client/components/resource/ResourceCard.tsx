import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { capitalizeFirstLetter } from '../common/Utils'
import { TagBubble } from '../common/TagBubble'
import { Resource, resourceLookup } from '../../utils'
import { colours } from '../../styles'

// Shared styled components that can probably be factored out later
const Icon = styled.img<{ size: string }>`
  border-radius: 4px;
  height: ${({ size }) => size};
  object-fit: cover;
  width: ${({ size }) => size};
`

const ResourceCardContainer = styled.div`
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  cursor: pointer;

  // A subtle shadow around the card
  box-shadow: 0px 4px 4px 1px ${colours.neutralLight1};
`

const ResourceCardBanner = styled.div<{ bannerImageURL: string }>`
  background-image: url(${({ bannerImageURL }) => bannerImageURL});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 0;
  padding-top: calc(100% / 3); // 3:1 aspect ratio
  width: 100%;
`

const ResourceCardContent = styled.div`
  margin: 24px;
`

const ResourceCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 56px;
  justify-content: space-between;
`

const ResourceCardName = styled.h2`
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

const ResourceCardDescription = styled.p`
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

const ClubCardTag = (tag: string) => {
  if (tag in colours.tagColours) {
    return (
      <TagBubble colour={colours.tagColours[tag]} key={`club-card-tag-${tag}`}>
        {tag}
      </TagBubble>
    )
  } else {
    return <TagBubble key={`club-card-tag-${tag}`}>{tag}</TagBubble>
  }
}

interface ResourceCardProps {
  Resource: Resource
}

const StatisticsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 24px;
  margin-bottom: 16px;
`

const Statistic = styled.div`
  display: flex;
  flex-direction: column;
  width: 127px;
  margin-left: 4px;
  margin-right: 4px;
  margin-bottom: 8px;
`

const StatisticHeader = styled.p`
  margin: 0;
  font-weight: 700;
`

const StatisticNumber = styled.p`
  margin-top: 8px;
  font-size: 1.2em;
  margin-bottom: 0px;
`

const TotalReviews = styled.div`
  color: ${colours.primary2};
  margin-left: 24px;
  margin-right: 24px;
  margin-bottom: 24px;
  text-decoration: underline;

  &:hover {
    color: ${colours.primary1};
  }
`

export const ResourceCard = ({ Resource }: ResourceCardProps) => {
  const { id, name, description, links, resourceSlug } = Resource
  const router = useRouter()

  const handleClick = () => {
    router.push({ pathname: `/${resourceSlug}/${id}` })
  }

  return (
    <ResourceCardContainer onClick={handleClick}>
      <ResourceCardBanner bannerImageURL={links.bannerImage}></ResourceCardBanner>
      <ResourceCardContent>
        <ResourceCardHeader>
          <ResourceCardName>{name}</ResourceCardName>
          <Icon src={links.iconImage} size="56px"></Icon>
        </ResourceCardHeader>
        <ResourceCardDescription>{description}</ResourceCardDescription>
        {/* <TagRow>
          <TagGroup>{tags.map(ResourceCardTag)}</TagGroup>
        </TagRow> */}
      </ResourceCardContent>
      <StatisticsRow>
        {resourceLookup[resourceSlug]['criteria'].map((criterion) => (
          <Statistic>
            <StatisticHeader>{capitalizeFirstLetter(criterion)}</StatisticHeader>
            <StatisticNumber>{Resource.averageRating[criterion]}%</StatisticNumber>
          </Statistic>
        ))}
      </StatisticsRow>
      <TotalReviews>
        <a href={'/' + resourceSlug + '/' + id + '#reviews'}>{Resource.totalReviews} Reviews </a>
      </TotalReviews>
      {/* <p>
        {JSON.stringify(Resource.averageRating)}
      </p>
      <p>
        Total Reviews:{Resource.totalReviews}
      </p> */}
    </ResourceCardContainer>
  )
}
