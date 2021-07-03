import React, { createContext, useContext, useEffect, useState } from 'react'
import { Id, indexData, House, StudySpot, Washroom, deserializeClubsAndEvents } from '../utils'
import { useQuery } from 'react-query'

interface AppData {
  houses: Map<Id, House>
  studySpots: Map<Id, StudySpot>
  washrooms: Map<Id, Washroom>
}

export const AppContext = createContext<AppData>(null)

export const AppProvider = ({ children }) => {
  const [houses, setClubs] = useState<Map<Id, House>>(
    new Map([
      [
        1,
        {
          id: 1,
          name: 'House1',
          description: 'cool house',
          location: '123 Street',
          // links: {
          //   bannerImage: string
          //   iconImage: string
          // }
          overallRating: 8,
          review: [
            {
              comment: 'comment',
              rating: 8,
            },
            {
              comment: 'comment2',
              rating: 9,
            },
          ],
        },
      ],
      [
        2,
        {
          id: 2,
          name: 'House2',
          description: 'cool house 2',
          location: '123 Street',
          // links: {
          //   bannerImage: string
          //   iconImage: string
          // }
          overallRating: 8,
          review: [
            {
              comment: 'comment',
              rating: 8,
            },
            {
              comment: 'comment2',
              rating: 9,
            },
          ],
        },
      ],
    ])
  )
  const [studySpots, setStudySpots] = useState<Map<Id, StudySpot>>()
  const [washrooms, setWashrooms] = useState<Map<Id, Washroom>>()

  return (
    <AppContext.Provider
      value={{
        houses,
        studySpots,
        washrooms,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext)
}
