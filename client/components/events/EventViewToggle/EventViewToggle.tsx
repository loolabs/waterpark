import React, { useState } from "react";
import { EventCalendarView } from "../EventCalendarView"
import { EventListView } from "../EventListView/EventListView"
import { Event } from '../../../context'
import { colours, device, fontWeight, desktopFontSize, mobileFontSize } from '../../../styles'
import styled from 'styled-components'

enum View { List, Calendar }

interface EventViewProps {
  filteredEvents: Array<Event>
}

const EventViewToggleContainer = styled.div<any>`
  margin: 10%;
`

const EventViewToggleButtonsContainer = styled.div<any>`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  @media ${device.laptop} {
    margin-top: 100px;
  }
`

const EventViewToggleButtonsSpacer = styled.div<any>`
  flex: 0 0 200px;
  @media ${device.laptop} {
    display: none;
  }
`

const EventViewToggleButtons = styled.div<any>`
  display: flex;
  margin-bottom: 50px;
  cursor: pointer;
`

const ToggleText = styled.div<any>`
  ${(props: any) => props.isActiveView && `
    font-weight: bold;

  `};
  margin-right: 25px;
`

export const EventViewToggle = ({ filteredEvents }: EventViewProps) => {

  const [activeView, setActiveView] = useState(View.List);
  
  const getEventViewButton = (viewType) => (
    <ToggleText 
      isActiveView={activeView===viewType}
      onClick={()=>setActiveView(viewType)}>
        {viewType == View.List ? "List View" : "Calendar View"}
    </ToggleText>
  )

  return (
    <EventViewToggleContainer> 
      <EventViewToggleButtonsContainer>
        <EventViewToggleButtonsSpacer/>
        <EventViewToggleButtons> 
          {getEventViewButton(View.List)}
          {getEventViewButton(View.Calendar)}
        </EventViewToggleButtons>
      </EventViewToggleButtonsContainer>
      {activeView === View.Calendar ? 
      <EventCalendarView filteredEvents={filteredEvents}/> : 
      <EventListView filteredEvents={filteredEvents}/>}
    </EventViewToggleContainer>
  );
};
