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
import { useRouter, useSearchParams } from 'next/navigation'
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
  // const isValidOffset =
  //   query?.offset && !isNaN(+query.offset) && +query.offset > 0
  // const [currentPage, setCurrentPage] = useState(
  //   isValidOffset ? +query.offset - 1 : 0
  // )

  const searchParams = useSearchParams()
  const isValidOffset =
    query?.offset && !isNaN(+query.offset) && +query.offset > 0

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
  }, [filteredProducts, isFilterInQuery])

  console.log(products)

  const loadProducts = async () => {
    try {
      setSpinner(true)
      const data = await getProductsFx('/products?limit=20&offset=0')
      const params = new URLSearchParams(searchParams)
      setProducts(data)
      // if (!isValidOffset) {
      //   params.set('offset', '1')
      //   // updateParamsAndFilters
      //   resetPagination(data)
      //   return
      // }

      // if (isValidOffset) {
      //   if (+query.offset > Math.ceil(data.count / 20)) {
      //     router.push(
      //       {
      //         query: {
      //           ...query,
      //           offset: 1,
      //         },
      //       },
      //       undefined,
      //       { shallow: true }
      //     )

      //     setCurrentPage(0)
      //     setProducts(isFilterInQuery ? filteredProducts : data)
      //     return
      //   }

      //   const offset = +query.offset - 1
      //   const result = await getProductsFx(
      //     `/products?limit=20&offset=${offset}`
      //   )

      //   setCurrentPage(offset)
      //   setProducts(isFilterInQuery ? filteredProducts : result)
      //   return
      // }

      // setCurrentPage(0)
      // setProducts(isFilterInQuery ? filteredProducts : data)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setTimeout(() => setSpinner(false), 1000)
    }
  }

  const resetPagination = (data: IProducts) => {
    setCurrentPage(0)
    setProducts(data)
  }

  const handlePageChange = async ({ selected }: { selected: number }) => {
    try {
      setSpinner(true)
      const params = new URLSearchParams(searchParams)
      const data = await getProductsFx('/products?limit=20&offset=0')
      console.log('params 1', params)

      if (selected > pagesCount) {
        console.log('reset 1', params)

        resetPagination(isFilterInQuery ? filteredProducts : data)
        return
      }

      if (isValidOffset && +params.get('offset')! > Math.ceil(data.count / 2)) {
        console.log('reset 2', params)

        resetPagination(isFilterInQuery ? filteredProducts : data)
        return
      }

      const { isValidBoilerQuery, isValidProductsQuery, isValidPriceQuery } =
        checkQueryParams(params)

      const result = await getProductsFx(
        `/products?limit=20&offset=${selected}${
          isFilterInQuery && isValidBoilerQuery
            ? `&product=${params.get('product')}`
            : ''
        }${
          isFilterInQuery && isValidProductsQuery
            ? `&products=${params.get('products')}`
            : ''
        }${
          isFilterInQuery && isValidPriceQuery
            ? `&priceFrom=${params.get('priceFrom')}&priceTo=${params.get(
                'priceTo'
              )}`
            : ''
        }`
      )
      console.log('result', result)

      params.set('offset', (selected + 1).toString())
      console.log('params 4', params)
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
  const validPageCount = Number.isInteger(pagesCount)
    ? Math.ceil(pagesCount)
    : 0

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
            pageCount={validPageCount}
            forcePage={
              currentPage >= validPageCount ? validPageCount - 1 : currentPage
            }
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  )
}

export default CatalogPage
