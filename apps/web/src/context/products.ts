import { IProducts } from '@/types/products';
import { IFilterCheckboxItem } from '@/types/catalog';
import { vendors, categories } from '@/utils/catalog';
import { createDomain } from 'effector';

const products = createDomain();

export const setProducts = products.createEvent<IProducts>();
export const setProductsCheapFirst = products.createEvent();
export const setProductsExpensiveFirst = products.createEvent();
export const setProductsByPopularity = products.createEvent();

export const setFilteredProducts = products.createEvent();

export const setVendors = products.createEvent<IFilterCheckboxItem[]>();
export const setCategories = products.createEvent<IFilterCheckboxItem[]>();

export const updateVendor = products.createEvent<IFilterCheckboxItem>();
export const updateCategory = products.createEvent<IFilterCheckboxItem>();

export const setVendorsFromQuery = products.createEvent<string[]>();
export const setCategoriesFromQuery = products.createEvent<string[]>();

const updateCheckboxes = (
  checkboxes: IFilterCheckboxItem[],
  id: string,
  payload: Partial<IFilterCheckboxItem>,
) =>
  checkboxes.map(item => {
    if (item.id === id) {
      return {
        ...item,
        ...payload,
      };
    }

    return item;
  });

const updateCheckboxesFromQuery = (
  checkboxes: IFilterCheckboxItem[],
  checkboxesFromQuery: string[],
) =>
  checkboxes.map(item => {
    if (checkboxesFromQuery.find(title => title === item.title)) {
      return {
        ...item,
        checked: true,
      };
    }

    return item;
  });

export const $products = products
  .createStore<IProducts>({} as IProducts)
  .on(setProducts, (_, items) => items)
  .on(setProductsCheapFirst, state => ({
    ...state,
    rows: state.rows.sort((a, b) => a.price - b.price),
  }))
  .on(setProductsExpensiveFirst, state => ({
    ...state,
    rows: state.rows.sort((a, b) => b.price - a.price),
  }))
  .on(setProductsByPopularity, state => ({
    ...state,
    rows: state.rows.sort((a, b) => b.popularity - a.popularity),
  }));

export const $vendors = products
  .createStore<IFilterCheckboxItem[]>(vendors as IFilterCheckboxItem[])
  .on(setVendors, (_, products) => products)
  .on(updateVendor, (state, payload) => [
    ...updateCheckboxes(state, payload.id as string, {
      checked: payload.checked,
    }),
  ])
  .on(setVendorsFromQuery, (state, checkboxesFromQuery) => [
    ...updateCheckboxesFromQuery(state, checkboxesFromQuery),
  ]);

export const $categories = products
  .createStore<IFilterCheckboxItem[]>(categories as IFilterCheckboxItem[])
  .on(setCategories, (_, products) => products)
  .on(updateCategory, (state, payload) => [
    ...updateCheckboxes(state, payload.id as string, {
      checked: payload.checked,
    }),
  ])
  .on(setCategoriesFromQuery, (state, checkboxesFromQuery) => [
    ...updateCheckboxesFromQuery(state, checkboxesFromQuery),
  ]);

export const $filteredProducts = products
  .createStore<IProducts>({} as IProducts)
  .on(setFilteredProducts, (_, products) => products);
