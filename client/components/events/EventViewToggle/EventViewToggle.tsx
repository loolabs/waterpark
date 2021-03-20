import React, { useState } from "react";
import EventCalendarView from "../EventCalendarView/EventCalendarView"
import EventListView from "../EventListView//EventListView"
import styled from 'styled-components'

const LISTVIEW_ACTIVE = 0;
const CALENDARVIEW_ACTIVE = 1;

export const EventViewToggle = () => {

  const [activeView, setActiveView] = useState(LISTVIEW_ACTIVE);

  const ToggleText = styled.div<any>`
    ${(props: any) => props.isActiveView`
      font-weight: bold;
    `};
    padding-right: 3em;
  `;

  const renderActiveView = () => {
    switch(activeView){
        case CALENDARVIEW_ACTIVE:
            return <EventCalendarView/>
        case LISTVIEW_ACTIVE:
        default:
            return <EventListView/>
    }
  }
  
  const getEventViewButton = (viewType) => (
    <ToggleText 
      isActiveView={activeView===viewType}>
      onClick={()=>setActiveView(viewType)}
    </ToggleText>
  )

  return (
    <div>
        {getEventViewButton(LISTVIEW_ACTIVE)}
        {getEventViewButton(CALENDARVIEW_ACTIVE)}
        {renderActiveView()}
    </div>
  );
};
