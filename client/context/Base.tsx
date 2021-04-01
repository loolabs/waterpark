import React, { createContext, useContext, useEffect, useState } from 'react'
import { indexData } from '../utils'
import moment, { Moment } from 'moment'

export type Id = number

interface AppData {
  clubs: Map<Id, Club>
  events: Map<Id, Event>
}

export interface Club {
  id: Id
  name: string
  description: string
  backgroundImageURL?: string
  iconURL: string
  facebookLink?: string
  twitterLink?: string
  instagramLink?: string
  websiteLink?: string
  tags: Array<string>
  events: Array<BasicEvent>
}

export interface BasicClub {
  name: string
  iconURL: string
}

export interface Event {
  id: Id
  name: string
  club: BasicClub
  description: string
  backgroundImageURL: string
  startDate: Moment
  endDate: Moment
  tags: Array<string>
}

export interface BasicEvent {
  name: string
  startTime: Moment
  endTime: Moment
  backgroundImageURL?: string
  tags: Array<string>
}

export const CLUBS: Array<Club> = [
  {
    id: 2932,
    name: 'UW Ballroom',
    description:
      'Tech+ Mentorship Program connects 1st- and 2nd-year UWaterloo students with experienced and passionate upper-years from different domains in tech, and fosters this community through events that bring everyone together.',
    backgroundImageURL:
      'https://images.unsplash.com/photo-1569949237615-e2defbeb5d0a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1960&q=80',
    iconURL:
      'https://avatars.githubusercontent.com/u/21977243?s=460&u=0d909376d193766e405c59ea61a473d773d47e3f&v=4',
    websiteLink: 'https://uwballroom.ca/',
    tags: ['Dancing', 'Foo', 'Bar'],
    events: [
      {
        name: 'Mac and Chess',
        startTime: moment('2021-03-26 12:00'),
        endTime: moment('2021-03-26 12:00'),
        backgroundImageURL:
          'https://images.unsplash.com/photo-1580541832626-2a7131ee809f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1956&q=80',
        tags: ['Bored', 'Pasta'],
      },
      {
        name: 'Mac and Chess',
        startTime: moment('2021-03-26 12:00'),
        endTime: moment('2021-03-26 12:00'),
        backgroundImageURL:
          'https://images.unsplash.com/photo-1580541832626-2a7131ee809f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1956&q=80',
        tags: ['Bored', 'Pasta'],
      },
    ],
  },
  {
    id: 8888,
    name: 'Cooking club',
    description: 'chef curry with the shot',
    iconURL:
      'https://avatars.githubusercontent.com/u/51551455?s=460&u=b397cbcdcc7f24a2c325784ad9333a4be316863b&v=4',
    facebookLink: 'https://www.facebook.com/uwcookingclub/',
    tags: ['Cooking'],
    events: [
      {
        name: 'Mac and Chess',
        startTime: moment('2021-03-26 12:00'),
        endTime: moment('2021-03-26 12:00'),
        backgroundImageURL:
          'https://images.unsplash.com/photo-1580541832626-2a7131ee809f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1956&q=80',
        tags: ['Bored Games', 'Pasta'],
      },
    ],
  },
  {
    id: 111,
    name: 'Loo Labs',
    description: '👩‍🔬',
    iconURL: 'https://avatars.githubusercontent.com/u/71415398?s=200&v=4',
    tags: ['Dev', 'Design', 'Product'],
    events: [],
  },
]

export const EVENTS: Array<Event> = [
  {
    id: 1234,
    name: 'Tech+ Mock Interview',
    club: {
      name: 'Tech + UW',
      iconURL:
        'https://avatars.githubusercontent.com/u/51551455?s=460&u=b397cbcdcc7f24a2c325784ad9333a4be316863b&v=4',
    },
    description: 'dancing in the dark',
    backgroundImageURL:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80',
    startDate: moment('2021-24-03 18:00'),
    endDate: moment('2021-24-03 20:00'),
    tags: ['Tech', 'Community'],
  },
  {
    id: 6787,
    name: 'ARBUS Society Movie Night',
    club: {
      name: 'ARBUS',
      iconURL:
        'https://avatars.githubusercontent.com/u/51551455?s=460&u=b397cbcdcc7f24a2c325784ad9333a4be316863b&v=4',
    },
    description: 'chef curry with the shot',
    backgroundImageURL:
      'https://images.unsplash.com/photo-1616169201999-0d80789e41c3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    startDate: moment('2021-24-04 8:00'),
    endDate: moment('2021-24-04 10:00'),
    tags: ['Arts'],
  },
  {
    id: 6367,
    name: 'UWACC Open Auditions',
    club: {
      name: 'UWACC',
      iconURL:
        'https://avatars.githubusercontent.com/u/21977243?s=460&u=0d909376d193766e405c59ea61a473d773d47e3f&v=4',
    },
    description: '👩‍🔬',
    backgroundImageURL:
      'https://images.unsplash.com/photo-1616256074022-3a20e0e8bf1b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80',
    startDate: moment('2021-24-05 10:00'),
    endDate: moment('2021-24-05 12:00'),
    tags: ['Science', 'Health'],
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
