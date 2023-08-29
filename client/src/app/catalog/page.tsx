'use client'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Art Box - Catalog',
}

export default function Catalog() {
  return (
    <>
      <h1>Catalog</h1>
      <div className="overlay" />
    </>
  )
}
