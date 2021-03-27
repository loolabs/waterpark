import React, { createContext, useContext, useEffect, useState } from 'react'
import { Club, Event, Id, indexData } from '../utils'
import { useQuery } from 'react-query'
import { deserializeClubsAndEvents } from '../utils'

interface AppData {
  clubs: Map<Id, Club>
  events: Map<Id, Event>
}

// export type Club = {
//   id: Id
//   name: string
//   description: string
// }

// export type Event = {
//   id: Id
//   name: string
//   description: string
// }

// export const CLUBS: Array<Club> = [
//   {
//     id: 2932,
//     name: 'UW Ballroom',
//     description: 'dancing in the dark',
//   },
//   {
//     id: 8888,
//     name: 'Cooking club',
//     description: 'chef curry with the shot',
//   },
//   {
//     id: 111,
//     name: 'Loo Labs',
//     description: '👩‍🔬',
//   },
// ]

// export const EVENTS: Array<Event> = [
//   {
//     id: 1234,
//     name: 'Tech+ Mock Interview',
//     description: 'dancing in the dark',
//   },
//   {
//     id: 6787,
//     name: 'ARBUS Society Movie Night',
//     description: 'chef curry with the shot',
//   },
//   {
//     id: 6367,
//     name: 'UWACC Open Auditions',
//     description: '👩‍🔬',
//   },
// ]

export interface Tag {
  id: number
  name: string
  isActive: boolean
  category: string
  isFeatured: boolean
}

export const TAGS: Tag[] = [
  {
    id: 1,
    name: 'Active',
    isActive: false,
    category: 'General',
    isFeatured: true,
  },
  {
    id: 2,
    name: 'Career',
    isActive: false,
    category: 'General',
    isFeatured: false,
  },
  {
    id: 3,
    name: 'Community',
    isActive: false,
    category: 'General',
    isFeatured: false,
  },
  {
    id: 4,
    name: 'Creative',
    isActive: false,
    category: 'General',
    isFeatured: true,
  },
  {
    id: 5,
    name: 'Gaming',
    isActive: false,
    category: 'General',
    isFeatured: true,
  },
  {
    id: 6,
    name: 'Tech',
    isActive: false,
    category: 'General',
    isFeatured: true,
  },
  {
    id: 7,
    name: 'Arts',
    isActive: false,
    category: 'Faculty',
    isFeatured: false,
  },
  {
    id: 8,
    name: 'Engineering',
    isActive: false,
    category: 'Faculty',
    isFeatured: false,
  },
  {
    id: 9,
    name: 'Environment',
    isActive: false,
    category: 'Faculty',
    isFeatured: false,
  },
  {
    id: 10,
    name: 'Health',
    isActive: false,
    category: 'Faculty',
    isFeatured: false,
  },
  {
    id: 11,
    name: 'Math',
    isActive: false,
    category: 'Faculty',
    isFeatured: false,
  },
  {
    id: 12,
    name: 'Science',
    isActive: false,
    category: 'Faculty',
    isFeatured: true,
  },
]

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
