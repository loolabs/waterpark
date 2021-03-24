import React from 'react'
import moment from 'moment'
import { useRouter } from 'next/router'
import { Event } from '../../../context'
import styled from 'styled-components'
import { colours, device, fontWeight, desktopFontSize, mobileFontSize } from '../../../styles'

interface EventProps {
  event: Event
}

const ListCard = styled.div<any>`
  margin-bottom: 20px;
  width: 170px;
`

const ListCardImageContainer = styled.div<any>`
  height: 160px;
  width: 225px;
`

const ListCardImage = styled.img<any>`
  max-width: 100%;
  max-height: 100%;
`

const ListCardContent = styled.div<any>`
  padding: 20px;
`

const ListCardName = styled.div<any>`
  color: ${colours.neutralDark1};
  font-weight: bold;
  font-size: ${desktopFontSize.h3};
  margin-bottom: 25px;
`

const ListCardTime = styled.div<any>`
  font-size: ${desktopFontSize.subtitle1};
  line-height: 120%;
`

const ListCardFooter = styled.div<any>`
  display: flex;
  justify-content: space-between;
`

const ListCardClub = styled.div<any>`
  font-size: ${desktopFontSize.subtitle1};
  font-weight: bold;
`

const ListCardTags = styled.div<any>`
  display: flex;
`

const ListCardTag = styled.div<any>`
  margin-left: 12px;
  padding: 8px 16px;
  background: red;
  border-radius: 50px;
  ${(props: any) => `
    background: ${colours.tagColours[props.tag]};
 `};
`

export const EventListCard = ({ event }: EventProps) => {
  const { id, name, club, img, startDate, endDate, tags } = event
  const router = useRouter()

  const handleClick = () => {
    router.push({ pathname: `/events/${id}` })
  }

  const getFormattedTimeString = () => (
    `${moment(startDate).format('LT')} - ${moment(endDate).format('LT')} ET`
  )

  const getFormattedTags = () => (
    tags.map(tag => <ListCardTag tag={tag}>
      {tag}
    </ListCardTag>)
  )

  return (
    <ListCard onClick={handleClick}>
      <ListCardImageContainer>
        <ListCardImage src={img}/>
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
            {club}
          </ListCardClub>
          <ListCardTags>
            {getFormattedTags()}
          </ListCardTags>
        </ListCardFooter>
      </ListCardContent>
    </ListCard>
  )
}

export default EventListCard