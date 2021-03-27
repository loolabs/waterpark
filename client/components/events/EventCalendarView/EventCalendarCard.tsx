import React from "react"
import { Event } from '../../../context'
import styled from 'styled-components'
import { colours, device, fontWeight, desktopFontSize, mobileFontSize } from '../../../styles'

interface EventProps {
    event: Event
}

const CalendarCard = styled.div<any>`
  margin-bottom: 20px;
  width: 170px;
`

const CalendarCardImageContainer = styled.div<any>`
  height: 90px;
  width: 170px;
`

const CalendarCardImage = styled.img<any>`
  max-width: 100%;
  max-height: 100%;
`

const CalendarCardEventName = styled.p<any>`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: ${desktopFontSize.subtitle2};
  line-height: 120%;
`

const CalendarCardTime = styled.p<any>`
  font-size: ${desktopFontSize.subtitle2};
  line-height: 120%;
`

const CalendarCardEventClub = styled.p<any>`
  font-size: ${desktopFontSize.subtitle2};
  line-height: 120%;
`

const EventCalendarCard = ({ event }: EventProps) => {
  const { name, club, backgroundImageURL, startDate, endDate } = event

  const getFormattedTimeString = () => (
    `${startDate.format('LT')} - ${endDate.format('LT')} ET`
  )

  return (
    <CalendarCard>
      <CalendarCardImageContainer>
        <CalendarCardImage src={backgroundImageURL}/>
        <CalendarCardEventName>
          {name}
        </CalendarCardEventName>
        <CalendarCardTime>
          {getFormattedTimeString()}
        </CalendarCardTime>
        <CalendarCardEventClub>
          {club}
        </CalendarCardEventClub>
      </CalendarCardImageContainer>
    </CalendarCard>
  );
};

export default EventCalendarCard