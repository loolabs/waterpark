import React from 'react'
import { useRouter } from 'next/router'
import { Event } from '../../../utils'
import styled from 'styled-components'
import { colours, device, fontWeight, desktopFontSize, mobileFontSize } from '../../../styles'

interface EventProps {
  event: Event
}

const CalendarCard = styled.div`
  width: 170px;
  margin-bottom: 20px;
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
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: ${desktopFontSize.body1};
  margin: 0;
`

const CalendarCardEventClub = styled.p`
  font-size: ${desktopFontSize.body1};
  margin: 0;
`

export const EventCalendarCard = ({ event }: EventProps) => {
  const { id, name, club, bannerImageURL, startTime, endTime } = event

  const router = useRouter()

  const handleEventClick = () => {
    router.push({ pathname: `/events/${id}` })
  }

  //Format: 8:55 PM - 9:55 PM EST
  const formattedTimeString = `${startTime.format('LT')} - ${endTime.format('LT z')}`

  return (
    <CalendarCard>
      <CalendarCardImageContainer onClick={handleEventClick}>
        <CalendarCardImage src={bannerImageURL} />
      </CalendarCardImageContainer>
      <CalendarCardEventName>{name}</CalendarCardEventName>
      <CalendarCardTime>{formattedTimeString}</CalendarCardTime>
      <CalendarCardEventClub>{club.name}</CalendarCardEventClub>
    </CalendarCard>
  )
}
