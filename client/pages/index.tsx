import React from 'react'
import Housing from './housing'

export default function Home() {
  const isPR = process.env.VERCEL_GIT_IS_PULL_REQUEST === '1'
  return (
    <div>
      {isPR && <p>{process.env.VERCEL_GIT_PULL_REQUEST_NUMBER}</p>}
      <Housing />
    </div>
  )
}
