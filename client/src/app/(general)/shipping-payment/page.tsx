'use client'

import ShippingPayment from '@/components/templates/ShippingPayment/ShippingPayment'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'
import { useCallback } from 'react'

function ShippingPaymentPage() {
  const getDefaultTextGenerator = useCallback(() => 'Shipping and payment', [])
  const getTextGenerator = useCallback((param: string) => ({})[param], [])

  return (
    <>
      <Breadcrumbs
        getDefaultTextGenerator={getDefaultTextGenerator}
        getTextGenerator={getTextGenerator}
      />
      <ShippingPayment />
      <div className="overlay" />
    </>
  )
}

export default ShippingPaymentPage
