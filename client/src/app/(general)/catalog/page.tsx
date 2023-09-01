'use client'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import CatalogPage from '@/components/templates/CatalogPage/CatalogPage'
import { IQueryParams } from '@/types/catalog'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'
import { useCallback } from 'react'

function Catalog({ searchParams }: { searchParams: IQueryParams }) {
  // const { shouldLoadContent } = useRedirectByUserCheck()
  const getDefaultTextGenerator = useCallback(() => 'Catalog', [])
  const getTextGenerator = useCallback((param: string) => ({})[param], [])

  return (
    <>
      {/* {shouldLoadContent && ( */}
      <>
        <Breadcrumbs
          getDefaultTextGenerator={getDefaultTextGenerator}
          getTextGenerator={getTextGenerator}
        />
        <CatalogPage query={searchParams} />
        <div className="overlay" />
      </>
      {/* )} */}
    </>
  )
}

export default Catalog
