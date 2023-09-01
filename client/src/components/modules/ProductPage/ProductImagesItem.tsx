/* eslint-disable @next/next/no-img-element */
import { IProductImagesItemProps } from '@/types/product'
import styles from '@/styles/product/index.module.scss'

const ProductImagesItem = ({ src, callback, alt }: IProductImagesItemProps) => {
  const changeMainImage = () => callback(src)

  return (
    <li
      className={styles.product__images__list__item}
      onClick={changeMainImage}
    >
      <img src={src} alt={alt} />
    </li>
  )
}

export default ProductImagesItem
