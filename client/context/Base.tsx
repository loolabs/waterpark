import React, { createContext, useContext, useEffect, useState } from 'react'
import { indexData } from '../utils'

export type Id = number

interface AppData {
  clubs: Map<Id, Club>
  events: Map<Id, Event>
}

export type Club = {
  id: Id
  name: string
  description: string
}

export type Event = {
  id: Id
  name: string
  description: string
}

export const CLUBS: Array<Club> = [
  {
    id: 2932,
    name: 'UW Ballroom',
    description: 'dancing in the dark',
  },
  {
    id: 8888,
    name: 'Cooking club',
    description: 'chef curry with the shot',
  },
  {
    id: 111,
    name: 'Loo Labs',
    description: '👩‍🔬',
  },
]

export const EVENTS: Array<Event> = [
  {
    id: 1234,
    name: 'Tech+ Mock Interview',
    description: 'dancing in the dark',
  },
  {
    id: 6787,
    name: 'ARBUS Society Movie Night',
    description: 'chef curry with the shot',
  },
  {
    id: 6367,
    name: 'UWACC Open Auditions',
    description: '👩‍🔬',
  },
]

export const AppContext = createContext<AppData>(null)

export const AppProvider = ({ children }) => {
  const [clubs, setClubs] = useState<Map<Id, Club>>(indexData())
  const [events, setEvents] = useState<Map<Id, Event>>(indexData())

  useEffect(() => {
    // make API call
    setClubs(indexData(CLUBS))
    setEvents(indexData(EVENTS))
  }, [])

  return (
    <AppContext.Provider
      value={{
        clubs,
        events,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext)
}
