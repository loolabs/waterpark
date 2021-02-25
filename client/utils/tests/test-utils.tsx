import React, { FC, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { AppContext, clubs, events } from '../../pages/_app'
import Home from '../../pages'

const AllTheProviders: FC = ({ children }) => {
  return (
    <AppContext.Provider
      value={{
        clubs,
        events
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
