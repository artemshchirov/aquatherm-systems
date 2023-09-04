/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import styles from '@/styles/footer/index.module.scss';

const FooterLogo = () => (
  <div className={styles.footer__top__item}>
    <Link href="/" passHref legacyBehavior>
      <a className={styles.footer__top__item__logo}>
        <img src="/img/logo-footer.svg" alt="logo" />
        <span className={styles.footer__top__item__logo__text}>ECOMMERCE</span>
      </a>
    </Link>
  </div>
);

export default FooterLogo;
