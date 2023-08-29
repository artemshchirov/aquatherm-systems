import { NextRouter } from 'next/navigation'
import { getQueryParamOnFirstRender, idGenerator } from './common'
import { getProductsFx } from '@/app/api/products'
import { setFilteredProducts } from '@/context/products'

const createManufacturerCheckboxObj = (title: string) => ({
  title,
  checked: false,
  id: idGenerator(),
})

export const vendors = [
  'Ariston',
  'Chaffoteaux&Maury',
  'Baxi',
  'Bongioanni',
  'Saunier Duval',
  'Buderus',
  'Strategist',
  'Henry',
  'Northwest',
].map(createManufacturerCheckboxObj)

export const productsManufacturers = [
  'Azure',
  'Gloves',
  'Cambridgeshire',
  'Salmon',
  'Montana',
  'Sensor',
  'Lesly',
  'Radian',
  'Gasoline',
  'Croatia',
].map(createManufacturerCheckboxObj)

const checkPriceFromQuery = (price: number) =>
  price && !isNaN(price) && price >= 0 && price <= 10000

export const checkQueryParams = (router: NextRouter) => {
  const priceFromQueryValue = getQueryParamOnFirstRender(
    'priceFrom',
    router
  ) as string
  const priceToQueryValue = getQueryParamOnFirstRender(
    'priceTo',
    router
  ) as string
  const boilerQueryValue = JSON.parse(
    decodeURIComponent(getQueryParamOnFirstRender('product', router) as string)
  )
  const productsQueryValue = JSON.parse(
    decodeURIComponent(getQueryParamOnFirstRender('products', router) as string)
  )
  const isValidBoilerQuery =
    Array.isArray(boilerQueryValue) && !!boilerQueryValue?.length
  const isValidProductsQuery =
    Array.isArray(productsQueryValue) && !!productsQueryValue?.length
  const isValidPriceQuery =
    checkPriceFromQuery(+priceFromQueryValue) &&
    checkPriceFromQuery(+priceToQueryValue)

  return {
    isValidBoilerQuery,
    isValidProductsQuery,
    isValidPriceQuery,
    priceFromQueryValue,
    priceToQueryValue,
    boilerQueryValue,
    productsQueryValue,
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
  router: NextRouter
) {
  // const params = router.query
  const params = router.query
  console.log('params:', router)

  delete params.product
  delete params.products
  delete params.priceFrom
  delete params.priceTo

  router.push(
    {
      query: {
        ...params,
        ...updatedParams,
      },
    },
    undefined,
    { shallow: true }
  )

  const data = await getProductsFx(`/products?limit=20&offset=${path}`)

  setFilteredProducts(data)
}
