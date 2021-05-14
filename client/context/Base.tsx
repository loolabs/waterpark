import React, { createContext, useContext, useEffect, useState } from 'react'
import { Club, Event, Id, indexData } from '../utils'
import { useQuery } from 'react-query'
import { deserializeClubsAndEvents } from '../utils'

interface AppData {
  clubs: Map<Id, Club>
  events: Map<Id, Event>
}

export const AppContext = createContext<AppData>(null)

export const AppProvider = ({ children }) => {
  const [clubs, setClubs] = useState<Map<Id, Club>>(indexData())
  const [events, setEvents] = useState<Map<Id, Event>>(indexData())

  const fetchClubs = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clubs`)

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  }
  const result = useQuery('clubs', fetchClubs)

  useEffect(() => {
    const { deserializedClubs, deserializedEvents } = deserializeClubsAndEvents(result.data)
    setClubs(indexData(deserializedClubs))
    setEvents(indexData(deserializedEvents))
  }, [result.data])

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
