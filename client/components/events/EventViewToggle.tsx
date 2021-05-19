import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { EventCalendarView } from './EventCalendarView'
import { EventListView } from './EventListView/EventListView'
import { Event } from '../../utils'
import { colours, device, fontWeight, desktopFontSize, mobileFontSize } from '../../styles'
import styled from 'styled-components'
import { FilteredEvents } from '../../pages/events'

enum View {
  list = 'list',
  calendar = 'calendar',
}

interface EventViewProps {
  events: Map<string, Array<Event>>
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
  ${(props: any) =>
    props.isActiveView &&
    `
    font-weight: bold;
  `};
  margin-right: 24px;
`

export const EventViewToggle = ({ events }: EventViewProps) => {
  const router = useRouter()

  const { view } = router.query

  useEffect(() => {
    //refresh component whenever query param changes
  }, [router.query.view])

  const updateActiveView = (view) => {
    router.push({
      query: {
        view: view,
      },
    })
  }

  let formattedView = View.list
  if (typeof view === 'string') {
    formattedView = View[view]
  }

  return (
    <EventViewToggleContainer>
      <EventViewToggleButtonsContainer>
        <EventViewToggleButtonsSpacer />
        <EventViewToggleButtons>
          <EventViewToggleButton
            activeView={formattedView}
            viewType={View.list}
            updateActiveView={updateActiveView}
          />
          <EventViewToggleButton
            activeView={formattedView}
            viewType={View.calendar}
            updateActiveView={updateActiveView}
          />
        </EventViewToggleButtons>
      </EventViewToggleButtonsContainer>
      <ActiveView activeView={formattedView} events={events} />
    </EventViewToggleContainer>
  )
}

interface ActiveViewProps {
  activeView: View
  events: Map<string, Array<Event>>
}

const ActiveView = ({ activeView, events }: ActiveViewProps) => {
  switch (activeView) {
    case View.calendar:
      return <EventCalendarView events={events} />
    case View.list:
    default:
      return <EventListView events={events} />
  }
}

interface EventViewToggleButtonProps {
  activeView: View
  viewType: View
  updateActiveView: Function
}

const EventViewToggleButton = ({
  activeView,
  viewType,
  updateActiveView,
}: EventViewToggleButtonProps) => {
  const getViewTypeText = () => {
    switch (viewType) {
      case View.calendar:
        return 'Calendar View'
      case View.list:
      default:
        return 'List View'
    }
  }

  return (
    <ToggleText isActiveView={activeView === viewType} onClick={() => updateActiveView(viewType)}>
      {getViewTypeText()}
    </ToggleText>
  )
}
