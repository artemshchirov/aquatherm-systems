import { useStore } from 'effector-react';
import { $mode } from '@/context/mode';
import { ICatalogFilterMobileProps } from '@/types/catalog';
import spinnerStyles from '@/styles/spinner/index.module.scss';
import FiltersPopupTop from './FiltersPopupTop';
import styles from '@/styles/catalog/index.module.scss';
import FiltersPopup from './FiltersPopup';
import {
  $vendors,
  $categories,
  setVendors,
  setCategories,
  updateVendor,
  updateCategory,
} from '@/context/products';
import { useState } from 'react';
import Accordion from '@/components/elements/Accordion/Accordion';
import PriceRange from './PriceRange';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const CatalogFiltersMobile = ({
  spinner,
  resetFilterBtnDisabled,
  resetFilters,
  closePopup,
  applyFilters,
  filtersMobileOpen,
  setIsPriceRangeChanged,
  priceRange,
  setPriceRange,
}: ICatalogFilterMobileProps) => {
  const mode = useStore($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';
  const vendors = useStore($vendors);
  const categories = useStore($categories);
  const [openVendors, setOpenVendors] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);
  const handleOpenVendors = () => setOpenVendors(true);
  const handleCloseVendors = () => setOpenVendors(false);
  const handleOpenCategories = () => setOpenCategories(true);
  const handleCloseCategories = () => setOpenCategories(false);
  const isAnyVendorChecked = vendors.some(item => item.checked);
  const isAnyProductsManufacturerChecked = categories.some(item => item.checked);
  const isMobile = useMediaQuery(820);

  const resetAllVendors = () => setVendors(vendors.map(item => ({ ...item, checked: false })));

  const resetAllCategories = () =>
    setCategories(categories.map(item => ({ ...item, checked: false })));

  const applyFiltersAndClosePopup = () => {
    applyFilters();
    closePopup();
  };

  return (
    <div
      className={`${styles.catalog__bottom__filters} ${darkModeClass} ${
        filtersMobileOpen ? styles.open : ''
      }`}
    >
      <div className={styles.catalog__bottom__filters__inner}>
        <FiltersPopupTop
          resetBtnText="Reset all"
          title="Filters"
          resetFilters={resetFilters}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          closePopup={closePopup}
        />
        <div className={styles.filters__boiler_manufacturers}>
          <button
            className={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
            onClick={handleOpenVendors}
          >
            Vendors
          </button>
          <FiltersPopup
            title="Vendors"
            resetFilterBtnDisabled={!isAnyVendorChecked}
            updateManufacturer={updateVendor}
            setManufacturer={setVendors}
            applyFilters={applyFiltersAndClosePopup}
            manufacturersList={vendors}
            resetAllManufacturers={resetAllVendors}
            handleClosePopup={handleCloseVendors}
            openPopup={openVendors}
          />
        </div>
        <div className={styles.filters__boiler_manufacturers}>
          <button
            className={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
            onClick={handleOpenCategories}
          >
            Categories
          </button>
          <FiltersPopup
            title="Categories"
            resetFilterBtnDisabled={!isAnyProductsManufacturerChecked}
            updateManufacturer={updateCategory}
            setManufacturer={setCategories}
            applyFilters={applyFiltersAndClosePopup}
            manufacturersList={categories}
            resetAllManufacturers={resetAllCategories}
            handleClosePopup={handleCloseCategories}
            openPopup={openCategories}
          />
        </div>
        <div className={styles.filters__price}>
          <Accordion
            title="Price"
            titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
            hideArrowClass={styles.hide_arrow}
            isMobileForFilters={isMobile}
          >
            <div className={styles.filters__manufacturer__inner}>
              <PriceRange
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                setIsPriceRangeChanged={setIsPriceRangeChanged}
              />
              <div style={{ height: 24 }} />
            </div>
          </Accordion>
        </div>
      </div>
      <div className={styles.filters__actions}>
        <button
          className={styles.filters__actions__show}
          onClick={applyFiltersAndClosePopup}
          disabled={resetFilterBtnDisabled}
        >
          {spinner ? (
            <span className={spinnerStyles.spinner} style={{ top: 6, left: '47%' }} />
          ) : (
            'Submit'
          )}
        </button>
      </div>
    </div>
  );
};

export default CatalogFiltersMobile;
