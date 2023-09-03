import { useStore } from 'effector-react';
import { $mode } from '@/context/mode';
import { IFiltersPopupProps } from '@/types/catalog';
import FiltersPopupTop from './FiltersPopupTop';
import FilterManufacturerAccordion from './FilterManufacturerAccordion';
import styles from '@/styles/catalog/index.module.scss';

const FiltersPopup = ({
  resetFilterBtnDisabled,
  resetAllManufacturers,
  handleClosePopup,
  updateManufacturer,
  setManufacturer,
  applyFilters,
  openPopup,
  title,
  manufacturersList
}: IFiltersPopupProps) => {
  const mode = useStore($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  return (
    <div className={`${styles.filters__popup} ${darkModeClass} ${openPopup ? styles.open : ''}`}>
      <div className={styles.filters__popup__inner}>
        <FiltersPopupTop
          resetBtnText="Reset"
          title={title as string}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          resetFilters={resetAllManufacturers}
          closePopup={handleClosePopup}
        />
        <FilterManufacturerAccordion
          manufacturersList={manufacturersList}
          title={false}
          updateManufacturer={updateManufacturer}
          setManufacturer={setManufacturer}
        />
      </div>
      <div className={styles.filters__actions}>
        <button
          className={styles.filters__actions__show}
          disabled={resetFilterBtnDisabled}
          onClick={applyFilters}
          style={{ marginBottom: 12 }}
        >
          Submit
        </button>
        <button className={styles.filters__actions__reset} onClick={handleClosePopup}>
          Back
        </button>
      </div>
    </div>
  );
};

export default FiltersPopup;
