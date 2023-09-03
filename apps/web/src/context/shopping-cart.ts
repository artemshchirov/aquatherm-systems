import { IShoppingCartItem } from '@/types/shopping-cart';
import { createDomain } from 'effector';

const shoppingCart = createDomain();

export const setShoppingCart = shoppingCart.createEvent<IShoppingCartItem[]>();
export const updateShoppingCart = shoppingCart.createEvent<IShoppingCartItem>();
export const removeShoppingCartItem = shoppingCart.createEvent<number>();
export const setTotalPrice = shoppingCart.createEvent<number>();
export const setDisableCart = shoppingCart.createEvent<boolean>();
export const updateCartItemTotalPrice = shoppingCart.createEvent<{
  productId: number;
  total_price: number;
}>();
export const updateCartItemCount = shoppingCart.createEvent<{
  productId: number;
  count: number;
}>();

const remove = (cartItems: IShoppingCartItem[], productId: number) =>
  cartItems.filter(item => item.productId !== productId);

function updateCartItem<T>(cartItems: IShoppingCartItem[], productId: number, payload: T) {
  return cartItems.map(item => {
    if (item.productId === productId) {
      return {
        ...item,
        ...payload
      };
    }

    return item;
  });
}

export const $shoppingCart = shoppingCart
  .createStore<IShoppingCartItem[]>([])
  .on(setShoppingCart, (_, shoppingCart) => shoppingCart)
  .on(updateShoppingCart, (state, cartItem) => [...state, cartItem])
  .on(removeShoppingCartItem, (state, productId) => [...remove(state, productId)])
  .on(updateCartItemTotalPrice, (state, { productId, total_price }) => [
    ...updateCartItem(state, productId, { total_price })
  ])
  .on(updateCartItemCount, (state, { productId, count }) => [
    ...updateCartItem(state, productId, { count })
  ]);

export const $totalPrice = shoppingCart
  .createStore<number>(0)
  .on(setTotalPrice, (_, value) => value);

export const $disableCart = shoppingCart
  .createStore<boolean>(false)
  .on(setDisableCart, (_, value) => value);
