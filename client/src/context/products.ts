import { IProducts } from '@/types/products'
import { IFilterCheckboxItem } from '@/types/catalog'
import { boilerManufacturers, partsManufacturers } from '@/utils/catalog'
import { createDomain } from 'effector'

const products = createDomain()

export const setProducts = products.createEvent<IProducts>()
export const setProductsCheapFirst = products.createEvent()
export const setProductsExpensiveFirst = products.createEvent()
export const setProductsByPopularity = products.createEvent()
export const setFilteredProducts = products.createEvent()
export const setBoilerManufacturers =
  products.createEvent<IFilterCheckboxItem[]>()
export const updateBoilerManufacturer =
  products.createEvent<IFilterCheckboxItem>()
export const setPartsManufacturers =
  products.createEvent<IFilterCheckboxItem[]>()
export const updatePartsManufacturer =
  products.createEvent<IFilterCheckboxItem>()
export const setBoilerManufacturersFromQuery = products.createEvent<string[]>()
export const setPartsManufacturersFromQuery = products.createEvent<string[]>()

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
  .on(setProducts, (_, parts) => parts)
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

export const $boilerManufacturers = products
  .createStore<IFilterCheckboxItem[]>(
    boilerManufacturers as IFilterCheckboxItem[]
  )
  .on(setBoilerManufacturers, (_, parts) => parts)
  .on(updateBoilerManufacturer, (state, payload) => [
    ...updateManufacturer(state, payload.id as string, {
      checked: payload.checked,
    }),
  ])
  .on(setBoilerManufacturersFromQuery, (state, manufacturersFromQuery) => [
    ...updateManufacturerFromQuery(state, manufacturersFromQuery),
  ])

export const $partsManufacturers = products
  .createStore<IFilterCheckboxItem[]>(
    partsManufacturers as IFilterCheckboxItem[]
  )
  .on(setPartsManufacturers, (_, parts) => parts)
  .on(updatePartsManufacturer, (state, payload) => [
    ...updateManufacturer(state, payload.id as string, {
      checked: payload.checked,
    }),
  ])
  .on(setPartsManufacturersFromQuery, (state, manufacturersFromQuery) => [
    ...updateManufacturerFromQuery(state, manufacturersFromQuery),
  ])

export const $filteredProducts = products
  .createStore<IProducts>({} as IProducts)
  .on(setFilteredProducts, (_, parts) => parts)
