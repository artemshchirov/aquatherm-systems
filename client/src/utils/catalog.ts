import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import { getQueryParamOnFirstRender, idGenerator } from './common'
import { getProductsFx } from '@/app/api/products'
import { setFilteredProducts } from '@/context/products'

const createManufacturerCheckboxObj = (title: string) => ({
  title,
  checked: false,
  id: idGenerator(),
})

export const vendors = ['Art Box', 'Union', 'AMSTERDAM'].map(
  createManufacturerCheckboxObj
)

export const categories = ['Sets', 'Paints', 'Canvas'].map(
  createManufacturerCheckboxObj
)

const checkPriceFromQuery = (price: number) =>
  price && !isNaN(price) && price >= 0 && price <= 10000

export const checkQueryParams = (params: URLSearchParams, path: string) => {
  const priceFromQueryValue = getQueryParamOnFirstRender(
    'priceFrom',
    params,
    path
  ) as string

  const priceToQueryValue = getQueryParamOnFirstRender(
    'priceTo',
    params,
    path
  ) as string

  const vendorQueryValue = JSON.parse(
    decodeURIComponent(
      getQueryParamOnFirstRender('vendor', params, path) as string
    )
  )
  const categoryQueryValue = JSON.parse(
    decodeURIComponent(
      getQueryParamOnFirstRender('category', params, path) as string
    )
  )
  const isValidVendorQuery =
    Array.isArray(vendorQueryValue) && !!vendorQueryValue?.length
  const isValidCategoryQuery =
    Array.isArray(categoryQueryValue) && !!categoryQueryValue?.length
  const isValidPriceQuery =
    checkPriceFromQuery(+priceFromQueryValue) &&
    checkPriceFromQuery(+priceToQueryValue)

  return {
    isValidVendorQuery,
    isValidCategoryQuery,
    isValidPriceQuery,
    priceFromQueryValue,
    priceToQueryValue,
    vendorQueryValue,
    categoryQueryValue,
  }
}

export const updateParamsAndFiltersFromQuery = async (
  callback: VoidFunction,
  path: string
) => {
  callback()

  const data = await getProductsFx(`/products?limit=20&offset=${path}`)

  setFilteredProducts(data)
}
export async function updateParamsAndFilters<T>(
  updatedParams: T,
  path: string,
  router: AppRouterInstance
) {
  router.push(`/catalog?limit=20&offset=${updatedParams}`)

  const data = await getProductsFx(`/products?limit=20&offset=${path}`)

  setFilteredProducts(data)
}
