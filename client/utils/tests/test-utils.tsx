import React, { FC, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { AppContext } from '../../context/Base'
import { indexData } from '../index'
import { Id } from '../types'
import moment from 'moment'

const localZone = Intl.DateTimeFormat().resolvedOptions().timeZone

const AllTheProviders: FC = ({ children }) => {
  return (
    <AppContext.Provider
      value={{
        houses: new Map(),
        studySpots: new Map(),
        washrooms: new Map(),
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
