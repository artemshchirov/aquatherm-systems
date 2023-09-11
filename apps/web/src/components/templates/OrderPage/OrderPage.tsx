import { useStore } from 'effector-react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { $shoppingCart, $totalPrice, setShoppingCart } from '@/context/shopping-cart';
import { formatPrice, idGenerator } from '@/utils/common';
import OrderAccordion from '@/components/modules/OrderPage/OrderAccordion';
import { $mode } from '@/context/mode';
import { checkPaymentFx, makePaymentFx } from '@/app/api/payment';
import { removeFromCartFx } from '@/app/api/shopping-cart';
import { $user, $userCity } from '@/context/user';
import styles from '@/styles/order/index.module.scss';
import spinnerStyles from '@/styles/spinner/index.module.scss';

const OrderPage = () => {
  const mode = useStore($mode);
  const user = useStore($user);
  const userCity = useStore($userCity);
  const shoppingCart = useStore($shoppingCart);
  const totalPrice = useStore($totalPrice);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';
  const [orderIsReady, setOrderIsReady] = useState(false);
  const [agreement, setAgreement] = useState(false);
  const spinner = useStore(makePaymentFx.pending);
  const router = useRouter();

  const handleAgreementChange = () => setAgreement(!agreement);

  useEffect(() => {
    const paymentId = sessionStorage.getItem('paymentId');

    if (paymentId) {
      checkPayment(paymentId);
    }
  }, []);

  const makePay = async () => {
    try {
      const { data } = await makePaymentFx({
        url: '/payment',
        amount: totalPrice,
        description: `Order №1 ${
          userCity.city.length ? `City: ${userCity.city}, Street: ${userCity.street}` : ''
        }`,
      });

      // NOTE: payment idGenerator for dev mode
      sessionStorage.setItem('paymentId', idGenerator());

      // TODO: for production
      // sessionStorage.setItem('paymentId', data.id)

      router.push(data.confirmation.confirmation_url);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const checkPayment = async (paymentId: string) => {
    try {
      const data = await checkPaymentFx({
        url: '/payment/info',
        paymentId,
      });

      if (data.status === 'succeeded') {
        resetCart();
        return;
      }

      sessionStorage.removeItem('paymentId');
    } catch (error) {
      console.log((error as Error).message);
      resetCart();
    }
  };

  const resetCart = async () => {
    sessionStorage.removeItem('paymentId');
    await removeFromCartFx(`/shopping-cart/all/${user.userId}`);
    setShoppingCart([]);
  };

  return (
    <section className={styles.order}>
      <div className="container">
        <h2 className={`${styles.order__title} ${darkModeClass}`}>Checkout</h2>
        <div className={styles.order__inner}>
          <div className={styles.order__cart}>
            <OrderAccordion setOrderIsReady={setOrderIsReady} showDoneIcon={orderIsReady} />
          </div>
          <div className={styles.order__pay}>
            <h3 className={`${styles.order__pay__title} ${darkModeClass}`}>Total</h3>
            <div className={`${styles.order__pay__inner} ${darkModeClass}`}>
              <div className={styles.order__pay__goods}>
                <span>
                  Goods ({shoppingCart.reduce((defaultCount, item) => defaultCount + item.count, 0)}
                  )
                </span>
                <span>{formatPrice(totalPrice)} P</span>
              </div>
              <div className={styles.order__pay__total}>
                <span>For the amount</span>
                <span className={darkModeClass}>{formatPrice(totalPrice)} ₪</span>
              </div>
              <button
                disabled={!(orderIsReady && agreement)}
                className={styles.order__pay__btn}
                onClick={makePay}
              >
                {spinner ? (
                  <span className={spinnerStyles.spinner} style={{ top: '6px', left: '47%' }} />
                ) : (
                  'Confirm the order'
                )}
              </button>
              <label className={`${styles.order__pay__rights} ${darkModeClass}`}>
                <input
                  className={styles.order__pay__rights__input}
                  type="checkbox"
                  onChange={handleAgreementChange}
                  checked={agreement}
                />
                <span className={styles.order__pay__rights__text}>
                  <strong>* I agree with the terms</strong> of the Terms of Use trading platform and
                  return policy
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderPage;
