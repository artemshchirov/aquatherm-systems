import { IProducts } from '@/types/products'
import { IFilterCheckboxItem } from '@/types/catalog'
import { vendors, productsManufacturers } from '@/utils/catalog'
import { createDomain } from 'effector'

const products = createDomain()

export const setProducts = products.createEvent<IProducts>()
export const setProductsCheapFirst = products.createEvent()
export const setProductsExpensiveFirst = products.createEvent()
export const setProductsByPopularity = products.createEvent()
export const setFilteredProducts = products.createEvent()
export const setVendors = products.createEvent<IFilterCheckboxItem[]>()
export const updateVendor = products.createEvent<IFilterCheckboxItem>()
export const setProductsManufacturers =
  products.createEvent<IFilterCheckboxItem[]>()
export const updateProductsManufacturer =
  products.createEvent<IFilterCheckboxItem>()
export const setVendorsFromQuery = products.createEvent<string[]>()
export const setProductsManufacturersFromQuery =
  products.createEvent<string[]>()

const updateManufacturer = (
  manufacturers: IFilterCheckboxItem[],
  id: string,
  payload: Partial<IFilterCheckboxItem>
) =>
  manufacturers.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        ...payload,
      }
    }

    return item
  })

const updateManufacturerFromQuery = (
  manufacturers: IFilterCheckboxItem[],
  manufacturersFromQuery: string[]
) =>
  manufacturers.map((item) => {
    if (manufacturersFromQuery.find((title) => title === item.title)) {
      return {
        ...item,
        checked: true,
      }
    }

    return item
  })

export const $products = products
  .createStore<IProducts>({} as IProducts)
  .on(setProducts, (_, items) => items)
  .on(setProductsCheapFirst, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => a.price - b.price),
  }))
  .on(setProductsExpensiveFirst, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => b.price - a.price),
  }))
  .on(setProductsByPopularity, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => b.popularity - a.popularity),
  }))

export const $vendors = products
  .createStore<IFilterCheckboxItem[]>(vendors as IFilterCheckboxItem[])
  .on(setVendors, (_, products) => products)
  .on(updateVendor, (state, payload) => [
    ...updateManufacturer(state, payload.id as string, {
      checked: payload.checked,
    }),
  ])
  .on(setVendorsFromQuery, (state, manufacturersFromQuery) => [
    ...updateManufacturerFromQuery(state, manufacturersFromQuery),
  ])

// FIXME: rename to categories
export const $productsManufacturers = products
  .createStore<IFilterCheckboxItem[]>(
    productsManufacturers as IFilterCheckboxItem[]
  )
  .on(setProductsManufacturers, (_, products) => products)
  .on(updateProductsManufacturer, (state, payload) => [
    ...updateManufacturer(state, payload.id as string, {
      checked: payload.checked,
    }),
  ])
  .on(setProductsManufacturersFromQuery, (state, manufacturersFromQuery) => [
    ...updateManufacturerFromQuery(state, manufacturersFromQuery),
  ])

export const $filteredProducts = products
  .createStore<IProducts>({} as IProducts)
  .on(setFilteredProducts, (_, products) => products)
