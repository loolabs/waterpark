import React, { createContext, useContext, useEffect, useState } from 'react'
import { Id, indexData, House, StudySpot, Washroom } from '../utils'
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
          name: 'Ron Edyt Village',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          location: '123 Street',
          links: {
            bannerImage:
              'https://uwaterloo.ca/campus-housing/sites/ca.campus-housing/files/uploads/images/rev-4.jpg',
            iconImage:
              'https://i.pinimg.com/originals/a6/02/c1/a602c159ab8e0bcac0093805240597ed.png',
          },
          gallery: [
            'https://uwaterloo.ca/campus-housing/sites/ca.campus-housing/files/uploads/images/rev-4.jpg',
          ],
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
          name: 'Village 1',
          description:
            'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
          location: '123 Street',
          links: {
            bannerImage:
              'https://uwaterloo.ca/campus-housing/sites/ca.campus-housing/files/uploads/images/v1-4.jpg',
            iconImage:
              'https://i.pinimg.com/originals/a6/02/c1/a602c159ab8e0bcac0093805240597ed.png',
          },
          gallery: [
            'https://uwaterloo.ca/campus-housing/sites/ca.campus-housing/files/uploads/images/rev-4.jpg',
          ],
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
