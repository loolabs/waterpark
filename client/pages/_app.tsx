import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppProvider } from '../context'
import dynamic from 'next/dynamic'

const DynamicNavBar = dynamic(() => import('../components/NavBar').then((mod) => mod.NavBar), {
  ssr: false,
})

function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <DynamicNavBar />
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default App
