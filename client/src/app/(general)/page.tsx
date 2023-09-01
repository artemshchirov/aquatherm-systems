'use client'

import type { Metadata } from 'next'
import DashboardPage from '../../components/templates/DashboardPage/DashboardPage'
import useRedirectByUserCheck from '../../hooks/useRedirectByUserCheck'

export const metadata: Metadata = {
  title: 'Art Box - Dashboard',
}

export default function Dashboard() {
  const { shouldLoadContent } = useRedirectByUserCheck()
  return (
    <>
      {shouldLoadContent && (
        <>
          <DashboardPage />
          <div className="overlay" />
        </>
      )}
    </>
  )
}
