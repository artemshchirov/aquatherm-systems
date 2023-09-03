/* eslint-disable @next/next/no-img-element */
import { useStore } from 'effector-react';
import Accordion from '@/components/elements/Accordion/Accordion';
import { $mode } from '@/context/mode';
import { IProductAccordionProps } from '@/types/product';
import styles from '@/styles/product/index.module.scss';

const ProductAccordion = ({ children, title }: IProductAccordionProps) => {
  const mode = useStore($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  const handleExpandAccordion = (expanded: boolean) => {
    const accordionTitles = document.querySelectorAll(`.${styles.product__accordion__title}`);

    accordionTitles.forEach(title => {
      const item = title as HTMLElement;

      if (!expanded) {
        item.style.borderBottomLeftRadius = '0';
        item.style.borderBottomRightRadius = '0';
      } else {
        item.style.borderBottomLeftRadius = '4px';
        item.style.borderBottomRightRadius = '4px';
      }
    });
  };

  return (
    <Accordion
      title={title}
      titleClass={`${styles.product__accordion__title} ${darkModeClass}`}
      arrowOpenClass={styles.open}
      boxShadowStyle="0px 2px 8px rgba(0, 0, 0, 0.1)"
      callback={handleExpandAccordion}
    >
      {children}
    </Accordion>
  );
};

export default ProductAccordion;
