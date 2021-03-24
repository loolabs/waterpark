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
  name: string,
  club: string,
  description: string,
  img: string,
  startDate: string,
  endDate: string,
  tags: Array<string>
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
    club: 'Tech + UW',
    description: 'dancing in the dark',
    tags: ["Tech", "Community"],
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80",
    startDate: "2021-24-03 18:00",
    endDate: "2021-24-03 20:00",
  },
  {
    id: 6787,
    name: 'ARBUS Society Movie Night',
    club: 'ARBUS',
    description: 'chef curry with the shot',
    tags: ["Arts"],
    img: "https://images.unsplash.com/photo-1616169201999-0d80789e41c3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    startDate: "2021-24-04 8:00",
    endDate: "2021-24-04 10:00",
  },
  {
    id: 6367,
    name: 'UWACC Open Auditions',
    club: 'UWACC',
    description: '👩‍🔬',
    tags: ["Science", "Health"],
    img: "https://images.unsplash.com/photo-1616256074022-3a20e0e8bf1b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80",
    startDate: "2021-24-05 10:00",
    endDate: "2021-24-05 12:00",
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
