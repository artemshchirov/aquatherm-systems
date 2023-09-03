/* eslint-disable indent */
import type { IOption, SelectOptionType } from '@/types/common';
import { useCallback, useEffect, useState } from 'react';
import Select from 'react-select';
import { $mode } from '@/context/mode';
import {
  $products,
  setProductsByPopularity,
  setProductsCheapFirst,
  setProductsExpensiveFirst
} from '@/context/products';
import { controlStyles, menuStyles, selectStyles } from '@/styles/catalog/select';
import { optionStyles } from '@/styles/searchInput';
import { createSelectOption } from '@/utils/common';
import { categoriesOptions } from '@/utils/selectContents';
import { useStore } from 'effector-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
interface Props {
  setSpinner: (status: boolean) => void;
}

const FilterSelect: React.FC<Props> = ({ setSpinner }) => {
  const mode = useStore($mode);
  const products = useStore($products);
  const [categoryOption, setCategoryOption] = useState<SelectOptionType | null>(null);
  const searchParams = useSearchParams();
  const first = searchParams.get('first');
  const router = useRouter();
  const pathname = usePathname();

  const updateCategoryOption = useCallback((value: string) => {
    setCategoryOption({ label: value, value });
  }, []);

  const updateRouteParam = useCallback(
    (newFirst: string) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.set('first', newFirst);
      router.push(`${pathname}?${current}`);
    },
    [pathname, router, searchParams]
  );

  useEffect(() => {
    if (products.rows) {
      switch (first) {
        case 'cheap':
          updateCategoryOption('Cheap first');
          setProductsCheapFirst();
          break;
        case 'expensive':
          updateCategoryOption('First Dear');
          setProductsExpensiveFirst();
          break;
        case 'popular':
          updateCategoryOption('By popularity');
          setProductsByPopularity();
          break;
        default:
          updateCategoryOption('Cheap first');
          setProductsCheapFirst();
          break;
      }
    }
  }, [products.rows, first, updateCategoryOption]);

  const handleSortOptionChange = useCallback(
    (selectedOption: SelectOptionType) => {
      setSpinner(true);
      setCategoryOption(selectedOption);

      switch ((selectedOption as IOption).value) {
        case 'Cheap first':
          setProductsCheapFirst();
          updateRouteParam('cheap');
          break;
        case 'First Dear':
          setProductsExpensiveFirst();
          updateRouteParam('expensive');
          break;
        case 'By popularity':
          setProductsByPopularity();
          updateRouteParam('popular');
          break;
      }

      setTimeout(() => setSpinner(false), 500);
    },
    [setSpinner, updateRouteParam]
  );

  return (
    <Select
      styles={{
        ...selectStyles,
        control: defaultStyles => ({
          ...controlStyles(defaultStyles, mode)
        }),
        input: defaultStyles => ({
          ...defaultStyles,
          color: mode === 'dark' ? '#f2f2f2' : '#222222'
        }),
        menu: defaultStyles => ({
          ...menuStyles(defaultStyles, mode)
        }),
        option: (defaultStyles, state) => ({
          ...optionStyles(defaultStyles, state, mode)
        })
      }}
      isSearchable={false}
      onChange={handleSortOptionChange}
      options={categoriesOptions}
      placeholder="I'm looking for..."
      value={categoryOption || createSelectOption('Cheap first')}
    />
  );
};

export default FilterSelect;
