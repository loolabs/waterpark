import React from 'react'
import { useRouter } from 'next/router'
import { Event } from '../../../context'
import styled from 'styled-components'
import { colours, device, fontWeight, desktopFontSize, mobileFontSize } from '../../../styles'

interface EventProps {
  event: Event
}

const ListCard = styled.div<any>`
  margin-bottom: 20px;
  flex: 3 0 auto;
  display: flex;
  width: 80%;
  border-radius: 6px;
  box-shadow: 0px 4px 4px 1px ${colours.neutralLight1};
  @media ${device.tablet} {
    width: 100%;
  }
`

const ListCardImageContainer = styled.div<any>`
  height: 160px;
  flex 0 0 225px;
  cursor: pointer;
  @media ${device.tablet} {
    flex 0 0 80px;
  }
`

const ListCardImage = styled.img<any>`
  max-width: 100%;
  max-height: 100%;
  @media ${device.tablet} {
    flex 0 0 80px;
  }
`

const ListCardContent = styled.div<any>`
  padding: 20px;
  flex-grow: 1
`

const ListCardName = styled.div<any>`
  font-weight: bold;
  font-size: ${desktopFontSize.h3};
  @media ${device.tablet} {
    font-size: ${mobileFontSize.h3};
  }
  margin-bottom: 5px;
`

const ListCardTime = styled.div<any>`
  font-size: ${desktopFontSize.subtitle2};
  line-height: 120%;
  margin-bottom: 20px;
  @media ${device.tablet} {
    font-size: ${mobileFontSize.subtitle2};
  }
`

const ListCardFooter = styled.div<any>`
  display: flex;
  justify-content: space-between;
  @media ${device.tablet} {
    display: block;
  }
`

const ListCardClub = styled.div<any>`
  font-size: ${desktopFontSize.subtitle2};
  font-weight: bold;
  flex: 0 0 100px;
  @media ${device.tablet} {
    font-size: ${mobileFontSize.subtitle2};
  }
`

const ListCardTags = styled.div<any>`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  @media ${device.tablet} {
    margin-top: 10px;
    justify-content: flex-start;
  }
`

const ListCardTag = styled.div<any>`
  margin-right: 12px;
  margin-bottom: 10px;
  padding: 8px 16px;
  background: white;
  flex: 0 0 50px;
  border-radius: 50px;
  ${(props: any) => `
    border: 2px solid ${colours.tagColours[props.tag]};
 `};
`

export const EventListCard = ({ event }: EventProps) => {
  const { id, name, club, backgroundImageURL, startDate, endDate, tags } = event

  const router = useRouter()

  const handleEventClick = () => {
    router.push({ pathname: `/events/${id}` })
  }

  const getFormattedTimeString = () => (
    `${startDate.format('LT')} - ${endDate.format('LT z')}`
  )

  const getFormattedTags = () => (
    tags.map((tag, index) => <ListCardTag tag={tag} key={`list-card-tag-${index}-${tag}`}>
      {tag}
    </ListCardTag>)
  )

  return (
    <ListCard>
      <ListCardImageContainer onClick={handleEventClick}>
        <ListCardImage src={backgroundImageURL}/>
      </ListCardImageContainer>
      <ListCardContent>
        <ListCardName>
          {name}
        </ListCardName>
        <ListCardTime>
          {getFormattedTimeString()}
        </ListCardTime>
        <ListCardFooter>
          <ListCardClub>
            {club.name}
          </ListCardClub>
          <ListCardTags>
            {getFormattedTags()}
          </ListCardTags>
        </ListCardFooter>
      </ListCardContent>
    </ListCard>
  )
}
