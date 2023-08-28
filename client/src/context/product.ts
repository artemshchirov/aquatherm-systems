import { IProduct } from '@/types/products'
import { createDomain } from 'effector'

const product = createDomain()

export const setProduct = product.createEvent<IProduct>()

export const $product = product
  .createStore<IProduct>({} as IProduct)
  .on(setProduct, (_, part) => part)
