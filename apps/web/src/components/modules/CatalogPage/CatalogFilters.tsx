import { useMediaQuery } from '@/hooks/useMediaQuery';
import CatalogFiltersDesktop from './CatalogFiltersDesktop';
import { ICatalogFiltersProps } from '@/types/catalog';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  $vendors,
  $categories,
  setVendorsFromQuery,
  setCategoriesFromQuery,
} from '@/context/products';
import { useStore } from 'effector-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getQueryParamOnFirstRender } from '@/utils/common';
import CatalogFiltersMobile from './CatalogFiltersMobile';
import {
  checkQueryParams,
  updateParamsAndFilters,
  updateParamsAndFiltersFromQuery,
} from '@/utils/catalog';

const CatalogFilters = ({
  priceRange,
  setPriceRange,
  setIsPriceRangeChanged,
  resetFilterBtnDisabled,
  resetFilters,
  isPriceRangeChanged,
  currentPage,
  setIsFilterInQuery,
  closePopup,
  filtersMobileOpen,
}: ICatalogFiltersProps) => {
  const isMobile = useMediaQuery(820);
  const [spinner, setSpinner] = useState(false);
  const vendors = useStore($vendors);
  const categories = useStore($categories);
  const router = useRouter();
  const searchParams = useSearchParams();
  const firstParams = new URLSearchParams(Array.from(searchParams.entries()));
  const pathname = usePathname();

  useEffect(() => {
    applyFiltersFromQuery();
  }, []);

  const applyFiltersFromQuery = async () => {
    try {
      const {
        isValidVendorQuery,
        isValidCategoryQuery,
        isValidPriceQuery,
        categoryQueryValue,
        priceFromQueryValue,
        vendorQueryValue,
        priceToQueryValue,
      } = checkQueryParams(firstParams, pathname);

      const vendorQuery = `&vendor=${getQueryParamOnFirstRender('vendor', firstParams, pathname)}`;
      const categoryQuery = `&category=${getQueryParamOnFirstRender(
        'category',
        firstParams,
        pathname,
      )}`;
      const priceQuery = `&priceFrom=${priceFromQueryValue}&priceTo=${priceToQueryValue}`;

      if (isValidVendorQuery && isValidCategoryQuery && isValidPriceQuery) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue);
          setVendorsFromQuery(vendorQueryValue);
          setCategoriesFromQuery(categoryQueryValue);
        }, `${currentPage}${priceQuery}${vendorQuery}${categoryQuery}`);
        return;
      }

      if (isValidVendorQuery && isValidCategoryQuery) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true);
          setVendorsFromQuery(vendorQueryValue);
          setCategoriesFromQuery(categoryQueryValue);
        }, `${currentPage}${vendorQuery}${categoryQuery}`);
        return;
      }

      if (isValidPriceQuery) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue);
        }, `${currentPage}${priceQuery}`);
      }

      if (isValidVendorQuery) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true);
          setVendorsFromQuery(vendorQueryValue);
        }, `${currentPage}${vendorQuery}`);
      }

      if (isValidCategoryQuery) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true);
          setCategoriesFromQuery(categoryQueryValue);
        }, `${currentPage}${categoryQuery}`);
      }

      if (isValidCategoryQuery && isValidPriceQuery) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue);
          setCategoriesFromQuery(categoryQueryValue);
        }, `${currentPage}${priceQuery}${categoryQuery}`);
      }

      if (isValidVendorQuery && isValidPriceQuery) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue);
          setVendorsFromQuery(vendorQueryValue);
        }, `${currentPage}${priceQuery}${vendorQuery}`);
      }
    } catch (error) {
      const err = error as Error;

      if (err.message === 'URI malformed') {
        toast.warning('Wrong url for filters');
        return;
      }
      toast.error((error as Error).message);
    }
  };

  const updatePriceFromQuery = (priceFrom: number, priceTo: number) => {
    setIsFilterInQuery(true);
    setPriceRange([+priceFrom, +priceTo]);
    setIsPriceRangeChanged(true);
  };

  const applyFilters = async () => {
    setIsFilterInQuery(true);
    try {
      setSpinner(true);
      const priceFrom = Math.ceil(priceRange[0]);
      const priceTo = Math.ceil(priceRange[1]);
      const priceQuery = isPriceRangeChanged ? `&priceFrom=${priceFrom}&priceTo=${priceTo}` : '';
      const checkedVendors = vendors.filter(item => item.checked).map(item => item.title);
      const checkedCategories = categories.filter(item => item.checked).map(item => item.title);

      const encodedVendorQuery = encodeURIComponent(JSON.stringify(checkedVendors));
      const encodedCategoryQuery = encodeURIComponent(JSON.stringify(checkedCategories));

      const vendorQuery = `&vendor=${encodedVendorQuery}`;
      const categoryQuery = `&category=${encodedCategoryQuery}`;
      const initialPage = currentPage > 0 ? 0 : currentPage;

      if (checkedVendors.length && checkedCategories.length && isPriceRangeChanged) {
        updateParamsAndFilters(
          `${initialPage + 1}${vendorQuery}${categoryQuery}${priceQuery}`,
          `${initialPage}${vendorQuery}${categoryQuery}${priceQuery}`,
          router,
        );
        return;
      }

      if (checkedVendors.length && isPriceRangeChanged) {
        updateParamsAndFilters(
          `${initialPage + 1}${vendorQuery}${priceQuery}`,
          `${initialPage}${vendorQuery}${priceQuery}`,
          router,
        );
        return;
      }

      if (checkedCategories.length && isPriceRangeChanged) {
        updateParamsAndFilters(
          `${initialPage + 1}${categoryQuery}${priceQuery}`,
          `${initialPage}${categoryQuery}${priceQuery}`,
          router,
        );
        return;
      }

      if (isPriceRangeChanged) {
        updateParamsAndFilters(
          `${initialPage + 1}${priceQuery}`,
          `${initialPage}${priceQuery}`,
          router,
        );
        return;
      }

      if (checkedVendors.length) {
        updateParamsAndFilters(
          `${initialPage + 1}${vendorQuery}`,
          `${initialPage}${vendorQuery}`,
          router,
        );
        return;
      }

      if (checkedCategories.length) {
        updateParamsAndFilters(
          `${initialPage + 1}${categoryQuery}`,
          `${initialPage}${categoryQuery}`,
          router,
        );
        return;
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setSpinner(false);
    }
  };

  return (
    <>
      {isMobile ? (
        <CatalogFiltersMobile
          closePopup={closePopup}
          spinner={spinner}
          applyFilters={applyFilters}
          priceRange={priceRange}
          setIsPriceRangeChanged={setIsPriceRangeChanged}
          setPriceRange={setPriceRange}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          resetFilters={resetFilters}
          filtersMobileOpen={filtersMobileOpen}
        />
      ) : (
        <CatalogFiltersDesktop
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          setIsPriceRangeChanged={setIsPriceRangeChanged}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          spinner={spinner}
          resetFilters={resetFilters}
          applyFilters={applyFilters}
        />
      )}
    </>
  );
};

export default CatalogFilters;
