import { useStore } from 'effector-react';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { $product } from '@/context/product';
import { $mode } from '@/context/mode';
import ProductImagesList from '@/components/modules/ProductPage/ProductImagesList';
import { formatPrice } from '@/utils/common';
import { $shoppingCart } from '@/context/shopping-cart';
import CartHoverCheckedSvg from '@/components/elements/CartHoverCheckedSvg/CartHoverCheckedSvg';
import CartHoverSvg from '@/components/elements/CartHoverSvg/CartHoverSvg';
import spinnerStyles from '@/styles/spinner/index.module.scss';
import { toggleCartItem } from '@/utils/shopping-cart';
import { $user } from '@/context/user';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import ProductTabs from '@/components/modules/ProductPage/ProductTabs';
import DashboardSlider from '@/components/modules/DashboardPage/DashboardSlider';
import { getProductsFx } from '@/app/api/products';
import { $products, setProducts, setProductsByPopularity } from '@/context/products';
import ProductAccordion from '@/components/modules/ProductPage/ProductAccordion';
import { removeFromCartFx } from '@/app/api/shopping-cart';
import styles from '@/styles/product/index.module.scss';

const ProductPage = () => {
  const mode = useStore($mode);
  const user = useStore($user);
  const isMobile = useMediaQuery(850);
  const product = useStore($product);
  const products = useStore($products);
  const cartItems = useStore($shoppingCart);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';
  const isInCart = cartItems.some(item => item.productId === product.id);
  const spinnerToggleCart = useStore(removeFromCartFx.pending);
  const spinnerSlider = useStore(getProductsFx.pending);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const data = await getProductsFx('/products?limit=20&offset=0');

      setProducts(data);
      setProductsByPopularity();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const toggleToCart = () => toggleCartItem(user.username, product.id, isInCart);

  return (
    <section>
      <div className="container">
        <div className={`${styles.product__top} ${darkModeClass}`}>
          <h2 className={`${styles.product__title} ${darkModeClass}`}>{product.name}</h2>
          <div className={styles.product__inner}>
            <ProductImagesList />
            <div className={styles.product__info}>
              <span className={`${styles.product__info__price} ${darkModeClass}`}>
                {formatPrice(product.price || 0)} ₪
              </span>
              <span className={styles.product__info__stock}>
                {product.in_stock > 0 ? (
                  <span className={styles.product__info__stock__success}>In stock</span>
                ) : (
                  <span className={styles.product__info__stock__not}>Not in stock</span>
                )}
              </span>
              <span className={styles.product__info__code}>Article: {product.vendor_code}</span>
              <button
                className={`${styles.product__info__btn} ${isInCart ? styles.in_cart : ''}`}
                onClick={toggleToCart}
              >
                {spinnerToggleCart ? (
                  <span className={spinnerStyles.spinner} style={{ top: 10, left: '45%' }} />
                ) : (
                  <>
                    <span className={styles.product__info__btn__icon}>
                      {isInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}
                    </span>
                    {isInCart ? <span>Added to cart</span> : <span>Add to cart</span>}
                  </>
                )}
              </button>
              {!isMobile && <ProductTabs />}
            </div>
          </div>
        </div>
        {isMobile && (
          <div className={styles.product__accordion}>
            <div className={styles.product__accordion__inner}>
              <ProductAccordion title="Description">
                <div className={`${styles.product__accordion__content} ${darkModeClass}`}>
                  <h3 className={`${styles.product__tabs__content__title} ${darkModeClass}`}>
                    {product.name}
                  </h3>
                  <p className={`${styles.product__tabs__content__text} ${darkModeClass}`}>
                    {product.description}
                  </p>
                </div>
              </ProductAccordion>
            </div>
            <ProductAccordion title="Characteristics">
              <div className={`${styles.product__accordion__content} ${darkModeClass}`}>
                <p className={`${styles.product__tabs__content__text} ${darkModeClass}`}>
                  {product.compatibility || 'Here can be some data about product characteristics.'}
                </p>
              </div>
            </ProductAccordion>
          </div>
        )}
        <div className={styles.product__bottom}>
          <h2 className={`${styles.product__title} ${darkModeClass}`}>You&apos;ll like it</h2>
          <DashboardSlider goToProductPage spinner={spinnerSlider} items={products.rows || []} />
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
