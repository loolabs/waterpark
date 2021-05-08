import React, { useEffect } from "react";
import { useRouter } from 'next/router'
import { EventCalendarView } from "../EventCalendarView"
import { EventListView } from "../EventListView/EventListView"
import { Event } from '../../../context'
import { colours, device, fontWeight, desktopFontSize, mobileFontSize } from '../../../styles'
import styled from 'styled-components'
import { FilteredEvents } from "../../../pages/events";

enum View {
  list = 'list',
  calendar = 'calendar',
}

interface EventViewProps {
  filteredEvents: FilteredEvents
}

const EventViewToggleContainer = styled.div<any>`
  margin: 14px 24px;
  @media not all and ${device.laptop} {
    margin: 10%;
  }
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
  flex-shrink: 0;
  flex-basis: 200px;
  @media ${device.tablet} {
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
  margin-right: 24px;
`

export const EventViewToggle = ({ filteredEvents }: EventViewProps) => {
  const router = useRouter()

  const { view } = router.query;

  useEffect(() => {
    //refresh component whenever query param changes
  }, [router.query.view])

  const updateActiveView = (view) => {
    router.push({query: {
      view: view
    }})
  }

  let formattedView = View.list
  if(typeof view === 'string'){
    formattedView = View[view]
  }
  
  return (
    <EventViewToggleContainer> 
      <EventViewToggleButtonsContainer>
        <EventViewToggleButtonsSpacer/>
        <EventViewToggleButtons>
          <EventViewToggleButton activeView={formattedView} viewType={View.list} updateActiveView={updateActiveView}/>
          <EventViewToggleButton activeView={formattedView} viewType={View.calendar} updateActiveView={updateActiveView}/>
        </EventViewToggleButtons>
      </EventViewToggleButtonsContainer>
      <ActiveView activeView={formattedView} filteredEvents={filteredEvents}/>
    </EventViewToggleContainer>
  );
};

interface ActiveViewProps {
  activeView: View,
  filteredEvents: FilteredEvents
}

const ActiveView = ({activeView, filteredEvents }: ActiveViewProps) => {
  
  const getActiveView = () => {
    switch (activeView){
      case View.calendar:
        return <EventCalendarView filteredEvents={filteredEvents}/>
      case View.list:
      default:
        return <EventListView filteredEvents={filteredEvents}/>
    }
  }

  return getActiveView()
}

interface EventViewToggleButtonProps {
  activeView: View,
  viewType: View,
  updateActiveView: Function
}

const EventViewToggleButton = ({activeView, viewType, updateActiveView}: EventViewToggleButtonProps) => {
  
  const getViewTypeText = () => {
    switch (viewType){
      case View.calendar:
        return "Calendar View"
      case View.list:
      default:
        return "List View"
    }
  }

  return <ToggleText 
    isActiveView={activeView===viewType}
    onClick={()=>updateActiveView(viewType)}>
    {getViewTypeText()}
  </ToggleText>
}
