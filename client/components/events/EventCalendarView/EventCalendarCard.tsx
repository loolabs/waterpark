import React from "react"
import { useRouter } from 'next/router'
import { Event } from '../../../context'
import styled from 'styled-components'
import { colours, device, fontWeight, desktopFontSize, mobileFontSize } from '../../../styles'

interface EventProps {
    event: Event
}

const CalendarCard = styled.div`
  width: 110px;
  @media not all and ${device.mobileL} {
    margin-bottom: 20px;
    width: 170px;
  }
`

const CalendarCardImageContainer = styled.div`
  height: 90px;
  width: 100%;
  cursor: pointer;
`

const CalendarCardImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`

const CalendarCardEventName = styled.p`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: ${desktopFontSize.body1};
  margin: 10px 0 0 0;
`

const CalendarCardTime = styled.p`
  font-size: ${desktopFontSize.body1};
  margin: 0;
`

const CalendarCardEventClub = styled.p`
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
    //Format: 8:55 PM - 9:55 PM EST
    `${startDate.format('LT')} - ${endDate.format('LT z')}`
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
