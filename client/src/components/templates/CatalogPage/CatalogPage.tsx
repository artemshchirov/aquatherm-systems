import { getProductsFx } from '@/app/api/products'
import FilterSelect from '@/components/modules/CatalogPage/FilterSelect'
import ManufacturersBlock from '@/components/modules/CatalogPage/ManufacturersBlock'
import {
  $vendors,
  $products,
  $filteredProducts,
  $productsManufacturers,
  setVendors,
  setProducts,
  setProductsManufacturers,
  updateVendor,
  updateProductsManufacturer,
} from '@/context/products'
import { $mode } from '@/context/mode'
import styles from '@/styles/catalog/index.module.scss'
import { useStore } from 'effector-react'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import CatalogItem from '@/components/modules/CatalogPage/CatalogItem'
import ReactPaginate from 'react-paginate'
import { IQueryParams } from '@/types/catalog'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { IProducts } from '@/types/products'
import CatalogFilters from '@/components/modules/CatalogPage/CatalogFilters'
import { usePopup } from '@/hooks/usePopup'
import { checkQueryParams } from '@/utils/catalog'
import FilterSvg from '@/components/elements/FilterSvg/FilterSvg'

const CatalogPage = ({ query }: { query: IQueryParams }) => {
  const mode = useStore($mode)
  const vendors = useStore($vendors)
  const productsManufacturers = useStore($productsManufacturers)
  const filteredProducts = useStore($filteredProducts)
  const products = useStore($products)
  const [spinner, setSpinner] = useState(false)
  const [priceRange, setPriceRange] = useState([1000, 9000])
  const [isFilterInQuery, setIsFilterInQuery] = useState(false)
  const [isPriceRangeChanged, setIsPriceRangeChanged] = useState(false)
  const pagesCount = Math.ceil(products.count / 20)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const isValidOffset =
    query.offset && !isNaN(+query.offset) && +query.offset > 0
  console.log(query)
  const [currentPage, setCurrentPage] = useState(
    isValidOffset ? +query.offset - 1 : 0
  )

  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const router = useRouter()
  const isAnyVendorChecked = vendors.some((item) => item.checked)
  const isAnyProductsManufacturerChecked = productsManufacturers.some(
    (item) => item.checked
  )
  const resetFilterBtnDisabled = !(
    isPriceRangeChanged ||
    isAnyVendorChecked ||
    isAnyProductsManufacturerChecked
  )
  const { toggleOpen, open, closePopup } = usePopup()

  useEffect(() => {
    loadProducts()
  }, [])

  const resetPagination = (data: IProducts) => {
    setCurrentPage(0)
    setProducts(data)
  }

  const loadProducts = async () => {
    try {
      setSpinner(true)
      const data = await getProductsFx('/products?limit=20&offset=0')
      setProducts(data)

      if (!isValidOffset) {
        router.replace(`${pathname}?limit=20&offset=1`)
        resetPagination(data)
        return
      }

      if (isValidOffset) {
        if (+query.offset > Math.ceil(data.count / 20)) {
          const current = new URLSearchParams(
            Array.from(searchParams.entries())
          )
          current.set('offset', '1')
          router.push(`${pathname}?${current}`)

          resetPagination(isFilterInQuery ? filteredProducts : data)
          return
        }
      }

      const offset = +query.offset - 1
      const result = await getProductsFx(`/products?limit=20&offset=${offset}`)

      setCurrentPage(offset)
      setProducts(isFilterInQuery ? filteredProducts : result)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setTimeout(() => setSpinner(false), 1000)
    }
  }

  const handlePageChange = async ({ selected }: { selected: number }) => {
    try {
      setSpinner(true)
      const params = new URLSearchParams(searchParams)
      const data = await getProductsFx('/products?limit=20&offset=0')

      if (selected > pagesCount) {
        resetPagination(isFilterInQuery ? filteredProducts : data)
        return
      }

      if (isValidOffset && +query.offset > Math.ceil(data.count / 2)) {
        resetPagination(isFilterInQuery ? filteredProducts : data)
        return
      }

      const result = await getProductsFx(
        `/products?limit=20&offset=${selected}`
      )
      params.set('offset', `${selected + 1}`)
      router.push(`${pathname}?${params}`)

      setCurrentPage(selected)
      setProducts(result)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setTimeout(() => setSpinner(false), 1000)
    }
  }

  const resetFilters = async () => {
    try {
      const data = await getProductsFx('/products?limit=20&offset=0')
      const params = new URLSearchParams(searchParams)

      params.delete('product')
      params.delete('products')
      params.delete('priceFrom')
      params.delete('priceTo')
      params.set('first', 'cheap')
      setVendors(vendors.map((item) => ({ ...item, checked: false })))
      setProductsManufacturers(
        productsManufacturers.map((item) => ({ ...item, checked: false }))
      )

      setProducts(data)
      setPriceRange([1000, 9000])
      setIsPriceRangeChanged(false)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <section className={styles.catalog}>
      <div className={`container ${styles.catalog__container}`}>
        <h2 className={`${styles.catalog__title} ${darkModeClass}`}>
          Каталог товаров
        </h2>
        <div className={`${styles.catalog__top} ${darkModeClass}`}>
          <AnimatePresence>
            {isAnyVendorChecked && (
              <ManufacturersBlock
                title="Производитель котлов:"
                event={updateVendor}
                manufacturersList={vendors}
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isAnyProductsManufacturerChecked && (
              <ManufacturersBlock
                title="Производитель запчастей:"
                event={updateProductsManufacturer}
                manufacturersList={productsManufacturers}
              />
            )}
          </AnimatePresence>
          <div className={styles.catalog__top__inner}>
            <button
              className={`${styles.catalog__top__reset} ${darkModeClass}`}
              disabled={resetFilterBtnDisabled}
              onClick={resetFilters}
            >
              Сбросить фильтр
            </button>
            <button
              className={styles.catalog__top__mobile_btn}
              onClick={toggleOpen}
            >
              <span className={styles.catalog__top__mobile_btn__svg}>
                <FilterSvg />
              </span>
              <span className={styles.catalog__top__mobile_btn__text}>
                Фильтр
              </span>
            </button>
            <FilterSelect setSpinner={setSpinner} />
          </div>
        </div>
        <div className={styles.catalog__bottom}>
          <div className={styles.catalog__bottom__inner}>
            <CatalogFilters
              priceRange={priceRange}
              setIsPriceRangeChanged={setIsPriceRangeChanged}
              setPriceRange={setPriceRange}
              resetFilterBtnDisabled={resetFilterBtnDisabled}
              resetFilters={resetFilters}
              isPriceRangeChanged={isPriceRangeChanged}
              currentPage={currentPage}
              setIsFilterInQuery={setIsFilterInQuery}
              closePopup={closePopup}
              filtersMobileOpen={open}
            />
            {spinner ? (
              <ul className={skeletonStyles.skeleton}>
                {Array.from(new Array(20)).map((_, i) => (
                  <li
                    key={i}
                    className={`${skeletonStyles.skeleton__item} ${
                      mode === 'dark' ? `${skeletonStyles.dark_mode}` : ''
                    }`}
                  >
                    <div className={skeletonStyles.skeleton__item__light} />
                  </li>
                ))}
              </ul>
            ) : (
              <ul className={styles.catalog__list}>
                {products.rows?.length ? (
                  products.rows.map((item) => (
                    <CatalogItem item={item} key={item.id} />
                  ))
                ) : (
                  <span>Список товаров пуст...</span>
                )}
              </ul>
            )}
          </div>
          <ReactPaginate
            containerClassName={styles.catalog__bottom__list}
            pageClassName={styles.catalog__bottom__list__item}
            pageLinkClassName={styles.catalog__bottom__list__item__link}
            previousClassName={styles.catalog__bottom__list__prev}
            nextClassName={styles.catalog__bottom__list__next}
            breakClassName={styles.catalog__bottom__list__break}
            breakLinkClassName={`${styles.catalog__bottom__list__break__link} ${darkModeClass}`}
            breakLabel="..."
            pageCount={products.count / 20}
            forcePage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  )
}

export default CatalogPage
