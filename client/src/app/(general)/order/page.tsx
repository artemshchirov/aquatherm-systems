'use client'

import { useCallback } from 'react'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import OrderPage from '@/components/templates/OrderPage/OrderPage'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'

function Order() {
  const { shouldLoadContent } = useRedirectByUserCheck()
  const getDefaultTextGenerator = useCallback(() => 'Checkout', [])
  const getTextGenerator = useCallback((param: string) => ({})[param], [])

  return (
    <>
      {shouldLoadContent && (
        <>
          <Breadcrumbs
            getDefaultTextGenerator={getDefaultTextGenerator}
            getTextGenerator={getTextGenerator}
          />
          <OrderPage />
          <div className="overlay" />
        </>
      )}
    </>
  )
}

export default Order
