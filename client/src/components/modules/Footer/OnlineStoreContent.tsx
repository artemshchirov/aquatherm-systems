import Link from 'next/link'
import styles from '@/styles/footer/index.module.scss'

const OnlineStoreContent = () => (
  <ul className={styles.footer__top__item__list}>
    <li className={styles.footer__top__item__list__item}>
      <Link href="/" passHref legacyBehavior>
        <a className={styles.footer__top__item__list__item__link}>Home</a>
      </Link>
    </li>
    <li className={styles.footer__top__item__list__item}>
      <Link href="/catalog?limit=20&offset=1" passHref legacyBehavior>
        <a className={styles.footer__top__item__list__item__link}>Catalog</a>
      </Link>
    </li>
    <li className={styles.footer__top__item__list__item}>
      <Link href="/shipping-payment" passHref legacyBehavior>
        <a className={styles.footer__top__item__list__item__link}>
          Shipping and payment
        </a>
      </Link>
    </li>
  </ul>
)

export default OnlineStoreContent
