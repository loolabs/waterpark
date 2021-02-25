import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

interface AppData {
  clubs: Map<Id, ClubInfo>;
  events: Map<Id, EventInfo>;
}

export const AppContext = React.createContext<AppData>(null);

export interface ClubInfo {
  name: string
  description: string
}

export interface EventInfo {
  name: string
  description: string
}

export type Id = number;

export const clubs = new Map([
  [
    2932,
    {
      name: 'UW Ballroom',
      description: 'dancing in the dark',
    },
  ],
  [
    8888,
    {
      name: 'Cooking club',
      description: 'chef curry with the shot',
    },
  ],
  [
    111,
    {
      name: 'Loo Labs',
      description: '👩‍🔬',
    },
  ],
])

export const events = new Map([
  [
    1234,
    {
      name: "Tech+ Mock Interview",
      description: "dancing in the dark",
    },
  ],
  [
    6787,
    {
      name: "ARBUS Society Movie Night",
      description: "chef curry with the shot",
    },
  ],
  [
    6367,
    {
      name: "UWACC Open Auditions",
      description: "👩‍🔬",
    },
  ],
]);

function App({ Component, pageProps }: AppProps) {
  return (
    <AppContext.Provider
      value={{
        clubs,
        events
      }}
    >
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}

export default App
