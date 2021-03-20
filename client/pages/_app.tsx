import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppProvider } from "../context"
import { NavBar } from "../components/NavBar"

function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <NavBar/>
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default App
