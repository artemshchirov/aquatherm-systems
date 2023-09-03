import { useStore } from 'effector-react';
import { $mode } from '@/context/mode';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import styles from '@/styles/contacts/index.module.scss';
import MailSvg from '@/components/elements/MailSvg/MailSvg';
import FeedbackForm from '@/components/modules/FeedbackForm/FeedbackForm';

const ContactsPage = ({ isWholesaleBuyersPage = false }) => {
  const mode = useStore($mode);
  const isMobile560 = useMediaQuery(560);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  return (
    <section className={styles.contacts}>
      <div className="container">
        <h2 className={`${styles.contacts__title} ${darkModeClass}`}>
          {isWholesaleBuyersPage ? 'Wholesale buyers' : 'Contacts'}
        </h2>
        <div className={styles.contacts__inner}>
          {isWholesaleBuyersPage ? (
            <div className={`${styles.contacts__list} ${darkModeClass}`}>
              <p>
                <span>Terms of wholesale orders are solved individually by phone: </span>
                <span>+972584441705</span>
              </p>
              <p>
                Or describe the essence of the order in the feedback form and we will contact you.
              </p>
            </div>
          ) : (
            <ul className={`${styles.contacts__list} ${darkModeClass}`}>
              <li className={styles.contacts__list__title}>
                <h3 className={darkModeClass}>Everything store for everyone</h3>
              </li>
              <li className={`${styles.contacts__list__item} ${darkModeClass}`}>
                <span>Office:</span>
                <span> Israel, Tel Aviv</span>
              </li>
              <li className={`${styles.contacts__list__item} ${darkModeClass}`}>
                <span>Stock:</span>
                <span> Israel, Bat Yam</span>
              </li>
              <li className={`${styles.contacts__list__item} ${darkModeClass}`}>
                <span>Office hours:</span>
                <span> Sat-Fri: from 8:00 to 22:00</span>
              </li>
              <li className={`${styles.contacts__list__item} ${darkModeClass}`}>
                <span>Our contact phone:</span>
                <span> +972584441705</span>
              </li>
              <li className={`${styles.contacts__list__item} ${darkModeClass}`}>
                <span>Order acceptance time:</span>
                <span> Sat-Fri: from 8:00 to 22:00</span>
              </li>
              <li className={`${styles.contacts__list__item} ${darkModeClass}`}>
                <span>Accepting orders electronically on the website:</span>
                <span>24/7</span>
              </li>
              <li className={`${styles.contacts__list__item} ${darkModeClass}`}>
                <span>E-mail:</span>
                <span className={styles.contacts__list__item__mail}>
                  {!isMobile560 && <MailSvg />} <span>artemschirov@gmail.com</span>
                </span>
              </li>
            </ul>
          )}
          <FeedbackForm />
        </div>
      </div>
    </section>
  );
};

export default ContactsPage;
