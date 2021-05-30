import { EventViewToggle } from '../../components/events'
import { Event } from '../../utils'
import React, { useState, useMemo, useCallback } from 'react'
import styled, { css } from 'styled-components'
import { useAppContext } from '../../context'
import { indexData } from '../../utils'
// import { EventList } from '../../components/events'
import { useSearch } from './../../components/hooks'
import { FilterBar, MoreFiltersModal } from '../../components/filters'
import { Tag, TAGS } from '../../context'

export const EVENT_MAP_KEY_FORMAT = 'YYYY-MM-DD'

const PageContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

const ModalContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
`

export interface FilteredEvents {
  filteredEventsDateMap: Map<string, Array<Event>>
  dateOrder: Array<string>
}

export default function Events() {
  const { events } = useAppContext()
  const filteredEventsArray = Array.from(events.values())

  //this requires that filteredEventsArray is in sorted order (with respect to event startDate)
  const filteredEventsDateMap: Map<string, Array<Event>> = new Map()

  for (const event of filteredEventsArray) {
    const formattedEventDate = event.startTime.format(EVENT_MAP_KEY_FORMAT)
    if (filteredEventsDateMap.has(formattedEventDate)) {
      filteredEventsDateMap.get(formattedEventDate).push(event)
    } else {
      filteredEventsDateMap.set(formattedEventDate, [event])
    }
  }

  const filteredEvents: Map<string, Array<Event>> = filteredEventsDateMap

  return <EventViewToggle events={filteredEvents} />

  // export default function Events() {
  //   const { events } = useAppContext()
  //   const allEvents: Array<Event> = useMemo(() => Array.from(events.values()), [events])
  //   const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  //   const [filteredEvents, filterTags, setSearchValue, setFilterTags] = useSearch(allEvents, ['name'])

  //   const allTags = useMemo(
  //     () =>
  //       Array.from(filterTags.keys()).map((id) => ({
  //         id: id,
  //         ...filterTags.get(id),
  //       })),
  //     [filterTags]
  //   )

  //   const handleModalOpen = () => {
  //     setIsModalOpen(!isModalOpen)
  //   }

  //   const handleFilterChipClick = (id: number) => {
  //     let newTags = filterTags
  //     newTags.set(id, {
  //       ...filterTags.get(id),
  //       isActive: !filterTags.get(id).isActive,
  //     })
  //     setFilterTags(new Map(newTags))
  //   }

  //   return (
  //     <PageContainer>
  //       <FilterBar
  //         isModalOpen={isModalOpen}
  //         handleModalOpen={handleModalOpen}
  //         filterTags={allTags}
  //         handleFilterChipClick={handleFilterChipClick}
  //       />
  //       <EventList events={events} filteredEvents={filteredEvents} setSearchValue={setSearchValue} />
  //       {isModalOpen && (
  //         <ModalContainer>
  //           dal
  //             handleModalOpen={handleModalOpen}
  //             filterTags={allTags}
  //             handleFilterChipClick={handleFilterChipClick}
  //           />
  //         </ModalContainer>
  //       )}
  //     </PageContainer>
  //   )
}
