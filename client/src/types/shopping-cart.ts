export interface IShoppingCartItem {
  id: number
  name: string
  price: number
  image: string
  in_stock: number
  vendor: string
  category: string
  count: number
  total_price: number
  userId: number
  productId: number
}

export interface IAddToCartFx {
  url: string
  username: string
  productId: number
}

export interface IUpdateCartItemFx {
  url: string
  payload: {
    total_price?: number
    count?: number
  }
}

export interface ICartItemCounterProps {
  totalCount: number
  productId: number
  initialCount: number
  increasePrice: VoidFunction
  decreasePrice: VoidFunction
}
