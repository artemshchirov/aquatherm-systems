import type { Metadata } from 'next'
import DashboardPage from '../../components/templates/DashboardPage/DashboardPage'

export const metadata: Metadata = {
  title: 'Art Box - Dashboard',
}

export default function Dashboard() {
  return (
    <>
      <DashboardPage />
      <div className="overlay" />
    </>
  )
}
