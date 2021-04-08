import React, { useState } from "react";
import { EventCalendarView } from "../EventCalendarView"
import { EventListView } from "../EventListView/EventListView"
import { Event } from '../../../context'
import styled from 'styled-components'

const LISTVIEW_ACTIVE = 0;
const CALENDARVIEW_ACTIVE = 1;

interface EventViewProps {
  filteredEvents: Array<Event>
}

export const EventViewToggle = ({ filteredEvents }: EventViewProps) => {

  const [activeView, setActiveView] = useState(LISTVIEW_ACTIVE);

  const EventViewToggle = styled.div<any>`
    margin: 10%;
  `

  const EventViewToggleButtonsContainer = styled.div<any>`
    display: flex;
    width: 100%;
    margin-bottom: 10px;
  `
  
  const EventViewToggleButtonsSpacer = styled.div<any>`
    flex: 0 0 200px;
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

  const renderActiveView = () => {
    switch(activeView){
      case CALENDARVIEW_ACTIVE:
        return <EventCalendarView filteredEvents={filteredEvents}/>
      case LISTVIEW_ACTIVE:
      default:
        return <EventListView filteredEvents={filteredEvents}/>
    }
  }
  
  const getEventViewButton = (viewType) => (
    <ToggleText 
      isActiveView={activeView===viewType}
      onClick={()=>setActiveView(viewType)}>
        {viewType == LISTVIEW_ACTIVE ? "List View" : "Calendar View"}
    </ToggleText>
  )

  const getToggleButtons = () => (
    <EventViewToggleButtonsContainer>
      <EventViewToggleButtonsSpacer/>
      <EventViewToggleButtons> 
        {getEventViewButton(LISTVIEW_ACTIVE)}
        {getEventViewButton(CALENDARVIEW_ACTIVE)}
      </EventViewToggleButtons>
    </EventViewToggleButtonsContainer>
  )
  
  return (
    <EventViewToggle> 
      {getToggleButtons()}
      {renderActiveView()}
    </EventViewToggle>
  );
};
