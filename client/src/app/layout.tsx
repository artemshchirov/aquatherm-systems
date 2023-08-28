'use client'

import type { Metadata } from 'next'
import ToastProvider from '../providers/toast.provider'
import '@/styles/globals.css'
import Header from '../components/modules/Header/Header'

export const metadata: Metadata = {
  title: 'Ecommerce api full',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ToastProvider>
          <Header />
          <main>{children}</main>
        </ToastProvider>
      </body>
    </html>
  )
}
