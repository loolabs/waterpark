import React, { createContext, useContext, useEffect, useState } from 'react'
import { Id, indexData, House, StudySpot, Washroom, Faculty, Status } from '../utils'
import { useQuery } from 'react-query'

interface AppData {
  houses: Map<Id, House>
  studySpots: Map<Id, StudySpot>
  washrooms: Map<Id, Washroom>
}

export const AppContext = createContext<AppData>(null)

export const AppProvider = ({ children }) => {
  const REVillage = {
    id: 1,
    resourceSlug: 'housing' as const,
    name: 'Ron Edyt Village',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    location: '123 Street',
    links: {
      bannerImage:
        'https://uwaterloo.ca/campus-housing/sites/ca.campus-housing/files/uploads/images/rev-4.jpg',
      iconImage: 'https://i.pinimg.com/originals/a6/02/c1/a602c159ab8e0bcac0093805240597ed.png',
    },
    galleryImages: [
      'https://uwaterloo.ca/campus-housing/sites/ca.campus-housing/files/uploads/images/rev-4.jpg',
      'https://uwaterloo.ca/campus-housing/sites/ca.campus-housing/files/uploads/images/rev-4.jpg',
      'https://uwaterloo.ca/campus-housing/sites/ca.campus-housing/files/uploads/images/rev-4.jpg',
    ],
    averageRating: { cleanliness: 20, price: 40, management: 60 },
    totalReviews: 3,
    reviews: [
      {
        avatarImage: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
        faculty: Faculty.Mathematics,
        status: Status.U1,
        timestamp: new Date(),
        comment:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        ratings: {
          cleanliness: 60,
          price: 60,
          management: 40,
        },
      },
      {
        avatarImage: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
        faculty: Faculty.Engineering,
        status: Status.Masters,
        timestamp: new Date(0),
        comment: 'comment2',
        ratings: {
          cleanliness: 80,
          price: 60,
          management: 40,
        },
      },
    ],
  }
  const Village1 = {
    id: 2,
    resourceSlug: 'housing' as const,
    name: 'Village 1',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
    location: '123 Street',
    links: {
      bannerImage:
        'https://uwaterloo.ca/campus-housing/sites/ca.campus-housing/files/uploads/images/v1-4.jpg',
      iconImage: 'https://i.pinimg.com/originals/a6/02/c1/a602c159ab8e0bcac0093805240597ed.png',
    },
    galleryImages: [
      'https://uwaterloo.ca/campus-housing/sites/ca.campus-housing/files/uploads/images/rev-4.jpg',
      'https://uwaterloo.ca/campus-housing/sites/ca.campus-housing/files/uploads/images/rev-4.jpg',
      'https://uwaterloo.ca/campus-housing/sites/ca.campus-housing/files/uploads/images/rev-4.jpg',
    ],
    averageRating: { cleanliness: 40, price: 20, management: 80 },
    totalReviews: 5,
    reviews: [
      {
        avatarImage: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
        faculty: Faculty.Environment,
        status: Status.PhD,
        timestamp: new Date(0),
        comment: 'comment',
        ratings: {
          cleanliness: 60,
          price: 80,
          management: 40,
        },
      },
      {
        avatarImage: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
        faculty: Faculty.Health,
        status: Status.U6Plus,
        timestamp: new Date(),
        comment: 'comment2',
        ratings: {
          cleanliness: 100,
          price: 40,
          management: 20,
        },
      },
    ],
  }
  const Village2 = {
    id: 3,
    resourceSlug: 'housing' as const,
    name: 'Village 2',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
    location: '123 Street',
    links: {
      bannerImage:
        'https://uwaterloo.ca/campus-housing/sites/ca.campus-housing/files/uploads/images/v1-4.jpg',
      iconImage: 'https://i.pinimg.com/originals/a6/02/c1/a602c159ab8e0bcac0093805240597ed.png',
    },
    galleryImages: [
      'https://uwaterloo.ca/campus-housing/sites/ca.campus-housing/files/uploads/images/rev-4.jpg',
      'https://uwaterloo.ca/campus-housing/sites/ca.campus-housing/files/uploads/images/rev-4.jpg',
      'https://uwaterloo.ca/campus-housing/sites/ca.campus-housing/files/uploads/images/rev-4.jpg',
    ],
    averageRating: { cleanliness: 100, price: 0, management: 0 },
    totalReviews: 100,
    reviews: [
      {
        avatarImage: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
        faculty: Faculty.Environment,
        status: Status.PhD,
        timestamp: new Date(0),
        comment: 'comment',
        ratings: {
          cleanliness: 60,
          price: 80,
          management: 40,
        },
      },
      {
        avatarImage: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
        faculty: Faculty.Health,
        status: Status.U6Plus,
        timestamp: new Date(),
        comment: 'comment2',
        ratings: {
          cleanliness: 100,
          price: 40,
          management: 20,
        },
      },
    ],
  }

  const [houses, setClubs] = useState<Map<Id, House>>(
    new Map([
      [1, REVillage],
      [2, Village1],
      [3, Village2],
    ])
  )

  const DCLibrary = {
    id: 1,
    resourceSlug: 'study-spots' as const,
    name: 'DC Library',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    location: '123 Street',
    links: {
      bannerImage:
        'https://cdn.canada247.info/assets/uploads/4547185939e141feb10adfa41647804d_-ontario-waterloo-regional-municipality-waterloo-davis-centre-library-519-888-4567html.jpg',
      iconImage:
        'https://fastly.4sqi.net/img/general/200x200/14304374_cec48Yq6o2iJQJJFybNDlOUBf0h2KEgtE47Ls_DDemo.jpg',
    },
    galleryImages: [
      'https://uwaterloo.ca/campus-housing/sites/ca.campus-housing/files/uploads/images/rev-4.jpg',
      'https://uwaterloo.ca/campus-housing/sites/ca.campus-housing/files/uploads/images/rev-4.jpg',
      'https://uwaterloo.ca/campus-housing/sites/ca.campus-housing/files/uploads/images/rev-4.jpg',
    ],
    averageRating: { cleanliness: 20, noise: 40 },
    totalReviews: 2,
    reviews: [
      {
        avatarImage: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
        faculty: Faculty.NonWaterloo,
        status: Status.Other,
        timestamp: new Date(),
        comment: 'comment',
        ratings: {
          cleanliness: 60,
          noise: 80,
        },
      },
      {
        avatarImage: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
        faculty: Faculty.Engineering,
        status: Status.U3,
        timestamp: new Date(0),
        comment: 'comment2',
        ratings: {
          cleanliness: 100,
          noise: 20,
        },
      },
    ],
  }

  const STCStarbucks = {
    id: 2,
    resourceSlug: 'study-spots' as const,
    name: 'STC Starbucks',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
    location: '123 Street',
    links: {
      bannerImage: 'https://s3-media0.fl.yelpcdn.com/bphoto/va92Ege0VdE8zQuAhW5YUQ/o.jpg',
      iconImage: 'https://i.pinimg.com/280x280_RS/8f/96/6c/8f966cf7eb441261f1e280274bf8a727.jpg',
    },
    galleryImages: [
      'https://uwaterloo.ca/campus-housing/sites/ca.campus-housing/files/uploads/images/rev-4.jpg',
      'https://uwaterloo.ca/campus-housing/sites/ca.campus-housing/files/uploads/images/rev-4.jpg',
      'https://uwaterloo.ca/campus-housing/sites/ca.campus-housing/files/uploads/images/rev-4.jpg',
    ],
    averageRating: { cleanliness: 80, noise: 20 },
    totalReviews: 6,
    reviews: [
      {
        avatarImage: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
        faculty: Faculty.Mathematics,
        status: Status.PhD,
        timestamp: new Date(),
        comment: 'comment',
        ratings: {
          cleanliness: 60,
          noise: 80,
        },
      },
      {
        avatarImage: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
        comment: 'comment2',
        faculty: Faculty.Engineering,
        status: Status.Faculty,
        timestamp: new Date(0),
        ratings: {
          cleanliness: 100,
          noise: 40,
        },
      },
    ],
  }

  const [studySpots, setStudySpots] = useState<Map<Id, StudySpot>>(
    new Map([
      [1, DCLibrary],
      [2, STCStarbucks],
    ])
  )

  const v1Washroom = {
    id: 1,
    resourceSlug: 'washrooms' as const,
    name: 'V1 Washrooms',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    location: '123 Street',
    links: {
      bannerImage:
        'https://uwaterloo.ca/campus-housing/sites/ca.campus-housing/files/uploads/images/v1-10.jpg',
      iconImage: 'https://i.pinimg.com/originals/a6/02/c1/a602c159ab8e0bcac0093805240597ed.png',
    },
    galleryImages: [
      'https://uwaterloo.ca/campus-housing/sites/ca.campus-housing/files/uploads/images/rev-4.jpg',
      'https://uwaterloo.ca/campus-housing/sites/ca.campus-housing/files/uploads/images/rev-4.jpg',
      'https://uwaterloo.ca/campus-housing/sites/ca.campus-housing/files/uploads/images/rev-4.jpg',
    ],
    averageRating: { cleanliness: 80 },
    totalReviews: 5,
    reviews: [
      {
        avatarImage: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
        comment: 'comment',
        timestamp: new Date(),
        faculty: Faculty.Engineering,
        status: Status.Faculty,
        ratings: {
          cleanliness: 40,
        },
      },
      {
        avatarImage: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
        comment: 'comment2',
        timestamp: new Date(0),
        faculty: Faculty.Mathematics,
        status: Status.U1,
        ratings: {
          cleanliness: 80,
        },
      },
    ],
  }

  const E3Washrooms = {
    id: 2,
    resourceSlug: 'washrooms' as const,
    name: 'E3 Washroom',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
    location: '123 Street',
    links: {
      bannerImage: 'https://i.redd.it/wyyfegsn5mc21.jpg',
      iconImage:
        'https://uwaterloo.ca/environment/sites/ca.environment/files/uploads/images/ev3_bright_sunny_day.jpg',
    },
    galleryImages: [
      'https://uwaterloo.ca/campus-housing/sites/ca.campus-housing/files/uploads/images/rev-4.jpg',
      'https://uwaterloo.ca/campus-housing/sites/ca.campus-housing/files/uploads/images/rev-4.jpg',
      'https://uwaterloo.ca/campus-housing/sites/ca.campus-housing/files/uploads/images/rev-4.jpg',
    ],
    averageRating: { cleanliness: 40, noise: 20 },
    totalReviews: 3,
    reviews: [
      {
        avatarImage: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
        comment: 'comment',
        faculty: Faculty.Science,
        status: Status.U1,
        timestamp: new Date(),
        ratings: {
          cleanliness: 60,
        },
      },
      {
        avatarImage: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
        comment: 'comment2',
        faculty: Faculty.Arts,
        status: Status.U3,
        timestamp: new Date(0),
        ratings: {
          cleanliness: 80,
        },
      },
    ],
  }

  const [washrooms, setWashrooms] = useState<Map<Id, Washroom>>(
    new Map([
      [1, v1Washroom],
      [2, E3Washrooms],
    ])
  )

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
