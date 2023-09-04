/* eslint-disable @next/next/no-img-element */
import { useStore } from 'effector-react';
import { $mode } from '@/context/mode';
import styles from '@/styles/about/index.module.scss';

const AboutPage = () => {
  const mode = useStore($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  return (
    <section className={styles.about}>
      <div className="container">
        <h2 className={`${styles.about__title} ${darkModeClass}`}>About company</h2>
        <div className={styles.about__inner}>
          <div className={`${styles.about__info} ${darkModeClass}`}>
            <p>
              Company &quot;ECOMMERCE&quot; offers you any goods for any purpose. 99% of spare parts
              presented on the site constantly are kept in stock at our warehouse.
            </p>
            <p>
              The range of the online store &quot;ECOMMERCE&quot; includes in anything from the
              brands Arderia, Ariston, Baxi, Beretta, Bosch, Buderus, Chaffoteaux, De Dietrich,
              Demrad, Electrolux, Ferroli, Fondital, Immergas, Junkers, Koreastar, Nova Florida,
              Saunier Duval, Sime, Tiberis, Vaillant, Viessmann.
            </p>
          </div>
          <div className={`${styles.about__img} ${styles.about__img__top}`}>
            <img src="/img/about-img.png" alt="image-1" />
          </div>
          <div className={`${styles.about__img} ${styles.about__img__bottom}`}>
            <img src="/img/about-img-2.png" alt="image-2" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
