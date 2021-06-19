import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppProvider } from '../context'
import dynamic from 'next/dynamic'
import Head from 'next/head'
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
    <div>
      <Head>
        <title>Waterpark</title>
        <meta name="keywords" content="Waterpark, Waterloo"/>
        <meta name="author" content="Loo Labs"/>
      </Head>
      <QueryClientProvider client={queryClientRef.current}>
        <AppProvider>
          <DynamicNavBar />
          <Component {...pageProps} />
        </AppProvider>
      </QueryClientProvider>
    </div>
  )
}

export default App
