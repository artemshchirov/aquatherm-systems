/* eslint-disable @next/next/no-img-element */
import { useStore } from 'effector-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { $product } from '@/context/product'
import { $mode } from '@/context/mode'
import styles from '@/styles/product/index.module.scss'

const ProductTabs = () => {
  const mode = useStore($mode)
  const product = useStore($product)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const [showDescription, setShowDescription] = useState(true)
  const [showCompatibility, setShowCompatibility] = useState(false)

  const handleShowDescription = () => {
    setShowDescription(true)
    setShowCompatibility(false)
  }

  const handleShowCompatibility = () => {
    setShowDescription(false)
    setShowCompatibility(true)
  }

  return (
    <div className={styles.product__tabs}>
      <div className={`${styles.product__tabs__controls} ${darkModeClass}`}>
        <button
          className={showDescription ? styles.active : ''}
          onClick={handleShowDescription}
        >
          Description
        </button>
        <button
          className={showCompatibility ? styles.active : ''}
          onClick={handleShowCompatibility}
        >
          Characteristics
        </button>
      </div>
      {showDescription && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.product__tabs__content}
        >
          <h3
            className={`${styles.product__tabs__content__title} ${darkModeClass}`}
          >
            {product.name}
          </h3>
          <p
            className={`${styles.product__tabs__content__text} ${darkModeClass}`}
          >
            {product.description}
          </p>
        </motion.div>
      )}
      {showCompatibility && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.product__tabs__content}
        >
          <p
            className={`${styles.product__tabs__content__text} ${darkModeClass}`}
          >
            {product.compatibility ||
              'Here can be some data about product characteristics.'}
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default ProductTabs
