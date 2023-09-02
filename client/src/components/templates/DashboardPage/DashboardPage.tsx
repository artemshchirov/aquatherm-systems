'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getBestsellersOrNewProductsFx } from '@/app/api/products'
import BrandsSlider from '@/components/modules/DashboardPage/BrandsSlider'
import { IProducts } from '@/types/products'
import styles from '@/styles/dashboard/index.module.scss'
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import DashboardSlider from '@/components/modules/DashboardPage/DashboardSlider'
import { $shoppingCart } from '@/context/shopping-cart'
import { AnimatePresence, motion } from 'framer-motion'
import CartAlert from '@/components/modules/DashboardPage/CartAlert'

const DashboardPage = () => {
  const [newProducts, setNewProducts] = useState<IProducts>({} as IProducts)
  const [bestsellers, setBestsellers] = useState<IProducts>({} as IProducts)
  const [spinner, setSpinner] = useState(false)
  const shoppingCart = useStore($shoppingCart)
  const [showAlert, setShowAlert] = useState(!!shoppingCart.length)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    if (shoppingCart.length) {
      setShowAlert(true)
      return
    }

    setShowAlert(false)
  }, [shoppingCart.length])

  const loadProducts = async () => {
    try {
      setSpinner(true)
      const bestsellers = await getBestsellersOrNewProductsFx(
        '/products/bestsellers'
      )
      const newProducts = await getBestsellersOrNewProductsFx('/products/new')

      setBestsellers(bestsellers)
      setNewProducts(newProducts)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  const closeAlert = () => setShowAlert(false)

  return (
    <section className={styles.dashboard}>
      <div className={`container ${styles.dashboard__container}`}>
        <AnimatePresence>
          {showAlert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`${styles.dashboard__alert} ${darkModeClass}`}
            >
              <CartAlert
                count={shoppingCart.reduce(
                  (defaultCount, item) => defaultCount + item.count,
                  0
                )}
                closeAlert={closeAlert}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <div className={styles.dashboard__brands}>
          <BrandsSlider />
        </div>
        <h2 className={`${styles.dashboard__title} ${darkModeClass}`}>
          Best things ever
        </h2>
        <div className={styles.dashboard__products}>
          <h3
            className={`${styles.dashboard__products__title} ${darkModeClass}`}
          >
            Bestsellers
          </h3>
          <DashboardSlider
            items={bestsellers.rows || []}
            spinner={spinner}
            goToProductPage
          />
        </div>
        <div className={styles.dashboard__products}>
          <h3
            className={`${styles.dashboard__products__title} ${darkModeClass}`}
          >
            New
          </h3>
          <DashboardSlider
            items={newProducts.rows || []}
            spinner={spinner}
            goToProductPage
          />
        </div>
        <div className={styles.dashboard__about}>
          <h3
            className={`${styles.dashboard__products__title} ${styles.dashboard__about__title} ${darkModeClass}`}
          >
            About us
          </h3>
          <p className={`${styles.dashboard__about__text} ${darkModeClass}`}>
            Instructions and diagrams will help you understand the operation,
            determine fault and choose the right one.
          </p>
        </div>
      </div>
    </section>
  )
}

export default DashboardPage
