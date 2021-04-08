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
  border-radius: 6px;
  box-shadow: 0px 4px 4px 1px ${colours.neutralLight1};
`

const ListCardImageContainer = styled.div<any>`
  height: 160px;
  width: 225px;
  cursor: pointer;
`

const ListCardImage = styled.img<any>`
  max-width: 100%;
  max-height: 100%;
`

const ListCardContent = styled.div<any>`
  padding: 20px;
  flex-grow: 1
`

const ListCardName = styled.div<any>`
  font-weight: bold;
  font-size: ${desktopFontSize.h3};
  margin-bottom: 5px;
`

const ListCardTime = styled.div<any>`
  font-size: ${desktopFontSize.subtitle2};
  line-height: 120%;
  margin-bottom: 20px;
`

const ListCardFooter = styled.div<any>`
  display: flex;
  justify-content: space-between;
`

const ListCardClub = styled.div<any>`
  font-size: ${desktopFontSize.subtitle2};
  font-weight: bold;
`

const ListCardTags = styled.div<any>`
  display: flex;
`

const ListCardTag = styled.div<any>`
  margin-left: 12px;
  padding: 8px 16px;
  background: white;
  border-radius: 50px;
  ${(props: any) => `
    border: 2px solid ${colours.tagColours[props.tag]};
 `};
`

export const EventListCard = ({ event }: EventProps) => {
  const { id, name, club, backgroundImageURL, startDate, endDate, tags } = event
  const router = useRouter()

  const handleClick = () => {
    router.push({ pathname: `/events/${id}` })
  }

  const getFormattedTimeString = () => (
    `${startDate.format('LT')} - ${endDate.format('LT')} ET`
  )

  const getFormattedTags = () => (
    tags.map(tag => <ListCardTag tag={tag} key={`tag-${tag}`}>
      {tag}
    </ListCardTag>)
  )

  return (
    <ListCard>
      <ListCardImageContainer onClick={handleClick}>
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