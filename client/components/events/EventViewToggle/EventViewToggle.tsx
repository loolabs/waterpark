import React, { useState } from "react";
import styled from ''

const LISTVIEW_ACTIVE = 0;
const CALENDARVIEW_ACTIVE = 1;

export const EventViewToggle = () => {

  const [activeView, setActiveView] = useState(LISTVIEW_ACTIVE);

  const renderActiveView = () => {
    switch(activeView){
        case CALENDARVIEW_ACTIVE:
            return <EventCalendarView/>
        case LISTVIEW_ACTIVE:
        default:
            return <EventListView/>
    }
  }

  const getActiveStateClassname = (viewType) => (
    activeView === viewType && 'active-view'
  )

  const getListViewButton = () => (
    <div className={`listviewButton ${getActiveStateClassname(LISTVIEW_ACTIVE)}`} onClick={()=>setActiveView(LISTVIEW_ACTIVE)}>
      
    </div>
  )

  const getCalendarViewButton = () => (
    <div className={`cardviewButton ${getActiveStateClassname(CALENDARVIEW_ACTIVE)}`} onClick={()=>setActiveView(CALENDARVIEW_ACTIVE)}>
        Calendar View
    </div>
  )

  return (
    <div>
        {getListViewButton()}
        {getCalendarViewButton()}
        {renderActiveView()}
    </div>
  );
};
