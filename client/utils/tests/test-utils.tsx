import React, { FC, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { AppContext, Club, Event, Id, CLUBS, EVENTS } from '../../context/Base'
import { indexData } from '../index'

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
