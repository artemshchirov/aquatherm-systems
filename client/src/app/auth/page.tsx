'use client'

import type { Metadata } from 'next'
import AuthPage from '@/components/templates/AuthPage/AuthPage'

export const metadata: Metadata = {
  title: 'Art Box - Profile',
}

export default function Auth() {
  return (
    <>
      <AuthPage />
    </>
  )
}
