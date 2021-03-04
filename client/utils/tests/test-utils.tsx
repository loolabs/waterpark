import React, { FC, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { AppContext, CLUBS, EVENTS } from '../../context/Base'
import { formatClubsData, formatEventsData } from "../index"

const AllTheProviders: FC = ({ children }) => {
  return (
    <AppContext.Provider
      value={{
        clubs: formatClubsData(CLUBS),
        events: formatEventsData(EVENTS)
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
