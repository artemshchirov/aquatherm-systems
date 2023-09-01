/* eslint-disable @next/next/no-img-element */
import { useStore } from 'effector-react'
import { useState } from 'react'
import { $product } from '@/context/product'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import ProductImagesItem from './ProductImagesItem'
import ProductSlider from './ProductSlider'
import styles from '@/styles/product/index.module.scss'

const ProductImagesList = () => {
  const product = useStore($product)
  const isMobile = useMediaQuery(850)
  const images = product.images ? (JSON.parse(product.images) as string[]) : []
  const [currentImgSrc, setCurrentImgSrc] = useState('')

  return (
    <div className={styles.product__images}>
      {isMobile ? (
        <ProductSlider images={images} />
      ) : (
        <>
          <div className={styles.product__images__main}>
            <img src={currentImgSrc || images[0]} alt={product.name} />
          </div>
          <ul className={styles.product__images__list}>
            {images.map((url, i) => (
              <ProductImagesItem
                key={i}
                alt={`image-${i + 1}`}
                callback={setCurrentImgSrc}
                src={url}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default ProductImagesList
