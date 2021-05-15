import React, { FC, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { AppContext } from '../../context/Base'
import { Club, Event, indexData } from '../index'
import { Id } from '../types'
import moment from 'moment'

const localZone = Intl.DateTimeFormat().resolvedOptions().timeZone

const CLUBS: Array<Club> = [
  {
    id: 2932,
    name: 'UW Ballroom',
    description:
      'Tech+ Mentorship Program connects 1st- and 2nd-year UWaterloo students with experienced and passionate upper-years from different domains in tech, and fosters this community through events that bring everyone together.',
    links: {
      bannerImage:
        'https://images.unsplash.com/photo-1569949237615-e2defbeb5d0a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1960&q=80',
      iconImage:
        'https://avatars.githubusercontent.com/u/21977243?s=460&u=0d909376d193766e405c59ea61a473d773d47e3f&v=4',
      website: 'https://uwballroom.ca/',
    },
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
        startTime: moment.tz('2019-11-18 10:55', 'Asia/Tokyo').local().tz(localZone),
        endTime: moment.tz('2019-11-18 11:55', 'Asia/Tokyo').local().tz(localZone),
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
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    links: {
      iconImage: 'https://avatars.githubusercontent.com/u/51551455',
      bannerImage: 'https://images.unsplash.com/photo-1528712306091-ed0763094c98',
      facebook: 'https://www.facebook.com/uwcookingclub/',
      website: 'https://uwcookingclub.ca/',
    },
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
    links: {
      iconImage: 'https://avatars.githubusercontent.com/u/71415398',
      bannerImage: 'https://avatars.githubusercontent.com/u/71415398',
    },
    tags: ['Tech', 'Engineering', 'Math', 'Dev', 'Design', 'Product'],
    events: [],
  },
]

const EVENTS: Array<Event> = [
  {
    id: 1234,
    name: 'Tech+ Mock Interview',
    club: {
      name: 'Tech + UW',
      iconURL: 'https://avatars.githubusercontent.com/u/51551455',
    },
    description:
      'Everyone goes through tough times! Come listen to some of your mentors share their personal stories on how they overcame adversity and the most important lessons they learned along the way. Youll have the opportunity to ask questions and make new connections! ',
    bannerImageURL:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlf0x8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80',
    startTime: moment.tz('2022-11-18 10:55', 'Asia/Tokyo').local().tz(localZone),
    endTime: moment.tz('2022-11-18 11:55', 'Asia/Tokyo').local().tz(localZone),
    tags: ['Tech', 'Community'],
  },
  {
    id: 12345,
    name: 'Tech+ Mock Interview 2',
    club: {
      name: 'Tech + UW',
      iconURL:
        'https://avatars.githubusercontent.com/u/51551455?s=460&u=b397cbcdcc7f24a2c325784ad9333a4be316863b&v=4',
    },
    description:
      'Everyone goes through tough times! Come listen to some of your mentors share their personal stories on how they overcame adversity and the most important lessons they learned along the way. Youll have the opportunity to ask questions and make new connections! ',
    bannerImageURL:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlf0x8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80',
    startTime: moment.tz('2022-11-18 10:55', 'Asia/Tokyo').local().tz(localZone),
    endTime: moment.tz('2022-11-18 11:55', 'Asia/Tokyo').local().tz(localZone),
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
    startTime: moment.tz('2022-11-18 10:55', 'Asia/Tokyo').local().tz(localZone),
    endTime: moment.tz('2022-11-18 11:55', 'Asia/Tokyo').local().tz(localZone),
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
    startTime: moment.tz('2022-11-18 10:55', 'Asia/Tokyo').local().tz(localZone),
    endTime: moment.tz('2022-11-18 11:55', 'Asia/Tokyo').local().tz(localZone),
    tags: ['Science', 'Health'],
  },
]

const AllTheProviders: FC = ({ children }) => {
  return (
    <AppContext.Provider
      value={{
        clubs: indexData<Id, Club>(CLUBS),
        events: indexData<Id, Event>(EVENTS),
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'

export { customRender as render }
