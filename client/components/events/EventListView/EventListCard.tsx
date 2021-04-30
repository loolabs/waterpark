import React from 'react'
import { useRouter } from 'next/router'
import { Event } from '../../../context'
import styled from 'styled-components'
import { colours, device, fontWeight, desktopFontSize, mobileFontSize } from '../../../styles'

interface EventProps {
  event: Event
}

const ListCard = styled.div`
  margin-bottom: 20px;
  flex: 3 0 auto;
  display: flex;
  width: 100%;
  border-radius: 6px;
  box-shadow: 0px 4px 4px 1px ${colours.neutralLight1};
  @media not all and ${device.tablet} {
    width: 80%;
    
  }
`

const ListCardImageContainer = styled.div`
  height: 160px;
  flex 0 0 80px;
  cursor: pointer;
  @media not all and ${device.tablet} {
    flex 0 0 225px;
  }
`

const ListCardImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  @media ${device.tablet} {
    flex 0 0 80px;
  }
`

const ListCardContent = styled.div`
  padding: 20px;
  flex-grow: 1
`

const ListCardName = styled.div`
  font-weight: bold;
  font-size: ${mobileFontSize.h3};
  @media not all and ${device.tablet} {
    font-size: ${desktopFontSize.h3};
  }
  margin-bottom: 5px;
`

const ListCardTime = styled.div`
  font-size: ${mobileFontSize.subtitle2};
  line-height: 120%;
  margin-bottom: 20px;
  @media not all and ${device.tablet} {
    font-size: ${desktopFontSize.subtitle2};
  }
`

const ListCardFooter = styled.div`
  display: block;
  justify-content: space-between;
  @media not all and ${device.tablet} {
    display: flex;  
  }
`

const ListCardClub = styled.div`
  font-size: ${mobileFontSize.subtitle2};
  font-weight: bold;
  flex: 0 0 100px;
  @media not all and ${device.tablet} {
    font-size: ${desktopFontSize.subtitle2};
  }
`

const ListCardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 10px;
  @media not all and ${device.tablet} {
    margin-top: 0;
    justify-content: flex-end;
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
     //Format: 8:55 PM - 9:55 PM EST
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
