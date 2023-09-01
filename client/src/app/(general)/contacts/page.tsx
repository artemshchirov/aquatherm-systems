import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Art Box - Contacts',
}

export default function Contacts() {
  return (
    <>
      <h1>Contacts</h1>
      <div className="overlay" />
    </>
  )
}
