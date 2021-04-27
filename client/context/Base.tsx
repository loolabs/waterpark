import React, { createContext, useContext, useEffect, useState } from 'react'
import { indexData } from '../utils'
import moment, { Moment } from 'moment-timezone'

export type Id = number

interface AppData {
  clubs: Map<Id, Club>
  events: Map<Id, Event>
}

export interface Club {
  id: Id
  name: string
  description: string
  bannerImageURL: string
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
  bannerImageURL: string
  startDate: Moment
  endDate: Moment
  tags: Array<string>
}

export interface BasicEvent {
  name: string
  startTime: Moment
  endTime: Moment
  bannerImageURL?: string
  tags: Array<string>
}

const localZone = Intl.DateTimeFormat().resolvedOptions().timeZone

export const CLUBS: Array<Club> = [
  {
    id: 2932,
    name: 'UW Ballroom',
    description:
      'Tech+ Mentorship Program connects 1st- and 2nd-year UWaterloo students with experienced and passionate upper-years from different domains in tech, and fosters this community through events that bring everyone together.',
    bannerImageURL:
      'https://images.unsplash.com/photo-1569949237615-e2defbeb5d0a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1960&q=80',
    iconURL:
      'https://avatars.githubusercontent.com/u/21977243?s=460&u=0d909376d193766e405c59ea61a473d773d47e3f&v=4',
    websiteLink: 'https://uwballroom.ca/',
    tags: ['Dancing', 'Foo', 'Bar'],
    events: [
      {
        name: 'Mac and Chess',
        startTime: moment.tz('2022-11-18 10:55', 'Asia/Tokyo').local().tz(localZone),
        endTime: moment.tz('2022-11-18 11:55', 'Asia/Tokyo').local().tz(localZone),
        bannerImageURL:
          'https://images.unsplash.com/photo-1580541832626-2a7131ee809f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1956&q=80',
        tags: ['Bored', 'Pasta'],
      },
      {
        name: 'Mac and Chess',
        startTime: moment.tz('2022-11-18 10:55', 'Asia/Tokyo').local().tz(localZone),
        endTime: moment.tz('2022-11-18 11:55', 'Asia/Tokyo').local().tz(localZone),
        bannerImageURL:
          'https://images.unsplash.com/photo-1580541832626-2a7131ee809f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1956&q=80',
        tags: ['Bored', 'Pasta'],
      },
    ],
  },
  {
    id: 8888,
    name: 'Cooking club with a really long name',
    description:
      'Lorem ipsum dolor sit amet adpisicing and that is all I remember from lorem ipsum. Lorem ipsum dolor yet again advertising hi. Maybe this should be smaller? And so on and so forth',
    iconURL: 'https://avatars.githubusercontent.com/u/51551455',
    bannerImageURL: 'https://images.unsplash.com/photo-1528712306091-ed0763094c98',
    facebookLink: 'https://www.facebook.com/uwcookingclub/',
    tags: ['Creative', 'Cooking', 'Community'],
    events: [
      {
        name: 'Mac and Chess',
        startTime: moment.tz('2022-11-18 10:55', 'Asia/Tokyo').local().tz(localZone),
        endTime: moment.tz('2022-11-18 11:55', 'Asia/Tokyo').local().tz(localZone),
        bannerImageURL:
          'https://images.unsplash.com/photo-1580541832626-2a7131ee809f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1956&q=80',
        tags: ['Bored Games', 'Pasta'],
      },
    ],
  },
  {
    id: 111,
    name: 'Loo Labs',
    description: '👩‍🔬',
    iconURL: 'https://avatars.githubusercontent.com/u/71415398',
    bannerImageURL: 'https://avatars.githubusercontent.com/u/71415398',
    tags: ['Tech', 'Engineering', 'Math', 'Dev', 'Design', 'Product'],
    events: [],
  },
]

export const EVENTS: Array<Event> = [
  {
    id: 1234,
    name: 'Tech+ Mock Interview',
    club: {
      name: 'Tech + UW',
      iconURL: 'https://avatars.githubusercontent.com/u/51551455',
    },
    description: 'dancing in the dark',
    bannerImageURL:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlf0x8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80',
    startDate: moment.tz('2022-11-18 10:55', 'Asia/Tokyo').local().tz(localZone),
    endDate: moment.tz('2022-11-18 11:55', 'Asia/Tokyo').local().tz(localZone),
    tags: ['Tech', 'Community'],
  },
  {
    id: 6787,
    name: 'ARBUS Society Movie Night',
    club: {
      name: 'ARBUS',
      iconURL: 'https://avatars.githubusercontent.com/u/51551455',
    },
    description: 'chef curry with the shot',
    bannerImageURL:
      'https://images.unsplash.com/photo-1616169201999-0d80789e41c3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlf0x8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    startDate: moment.tz('2022-11-18 10:55', 'Asia/Tokyo').local().tz(localZone),
    endDate: moment.tz('2022-11-18 11:55', 'Asia/Tokyo').local().tz(localZone),
    tags: ['Arts'],
  },
  {
    id: 6367,
    name: 'UWACC Open Auditions',
    club: {
      name: 'UWACC',
      iconURL: 'https://avatars.githubusercontent.com/u/21977243',
    },
    description: '👩‍🔬',
    bannerImageURL:
      'https://images.unsplash.com/photo-1616256074022-3a20e0e8bf1b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlf0x8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80',
    startDate: moment.tz('2022-11-18 10:55', 'Asia/Tokyo').local().tz(localZone),
    endDate: moment.tz('2022-11-18 11:55', 'Asia/Tokyo').local().tz(localZone),
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
