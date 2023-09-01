import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Art Box - About',
}

export default function About() {
  return (
    <>
      <h1>About</h1>
      <div className="overlay" />
    </>
  )
}
