import React from "react"
import { useRouter } from 'next/router'
import { Event } from '../../../context'
import styled from 'styled-components'
import { colours, device, fontWeight, desktopFontSize, mobileFontSize } from '../../../styles'

interface EventProps {
    event: Event
}

const CalendarCard = styled.div<any>`
  margin-bottom: 20px;
  width: 170px;
  @media ${device.mobileL} {
    width: 110px;
  }
`

const CalendarCardImageContainer = styled.div<any>`
  height: 90px;
  width: 100%;
  cursor: pointer;
`

const CalendarCardImage = styled.img<any>`
  max-width: 100%;
  max-height: 100%;
`

const CalendarCardEventName = styled.p<any>`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: ${desktopFontSize.body1};
  margin: 10px 0 0 0;
`

const CalendarCardTime = styled.p<any>`
  font-size: ${desktopFontSize.body1};
  margin: 0;
`

const CalendarCardEventClub = styled.p<any>`
  font-size: ${desktopFontSize.body1};
  margin: 0;
`

export const EventCalendarCard = ({ event }: EventProps) => {
  const { id, name, club, backgroundImageURL, startDate, endDate } = event

  const router = useRouter()

  const handleEventClick = () => {
    router.push({ pathname: `/events/${id}` })
  }

  const getFormattedTimeString = () => (
    `${startDate.format('LT')} - ${endDate.format('LT')} ET`
  )

  return (
    <CalendarCard>
      <CalendarCardImageContainer onClick={handleEventClick}>
        <CalendarCardImage src={backgroundImageURL}/>
        </CalendarCardImageContainer>
        <CalendarCardEventName>
          {name}
        </CalendarCardEventName>
        <CalendarCardTime>
          {getFormattedTimeString()}
        </CalendarCardTime>
        <CalendarCardEventClub>
          {club.name}
        </CalendarCardEventClub>
    </CalendarCard>
  )
}