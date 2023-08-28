'use client'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Art Box - Dashboard',
}

export default function Auth() {
  return (
    <>
      <h1>Dashboard</h1>
      <div className="overlay" />
    </>
  )
}
