import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppProvider } from '../context'
import dynamic from 'next/dynamic'
import { QueryClient, QueryClientProvider } from 'react-query'

const DynamicNavBar = dynamic(() => import('../components/NavBar').then((mod) => mod.NavBar), {
  ssr: false,
})

function App({ Component, pageProps }: AppProps) {
  const queryClientRef = React.useRef<QueryClient>()
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient()
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <AppProvider>
        <DynamicNavBar />
        <Component {...pageProps} />
      </AppProvider>
    </QueryClientProvider>
  )
}

export default App
