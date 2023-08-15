import {useProducts} from 'contexts/products-context';

import * as S from './style';
import {FilterTypes} from "../../utils/filterTypes";
import {useEffect} from "react";

const Filter = () => {
  const { filters, filterProducts, fetchCategories, categories, brands } = useProducts();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const selectedCheckboxes = new Set(filters);

  const toggleCategoryCheckbox = (label: string) => {
    if (selectedCheckboxes.has(label)) {
      selectedCheckboxes.delete(label);
    } else {
      selectedCheckboxes.add(label);
    }

    const filters = Array.from(selectedCheckboxes) as [];

    filterProducts(filters, FilterTypes.Category);
  };

  const toggleBrandCheckbox = (label: string) => {
    if (selectedCheckboxes.has(label)) {
      selectedCheckboxes.delete(label);
    } else {
      selectedCheckboxes.add(label);
    }

    const filters = Array.from(selectedCheckboxes) as [];

    filterProducts(filters, FilterTypes.Brand);
  };

  const createCategoryCheckbox = (label: string) => (
    <S.Checkbox label={label} handleOnChange={toggleCategoryCheckbox} key={label} />
  );

  const createBrandCheckbox = (label: string) => (
    <S.Checkbox label={label} handleOnChange={toggleBrandCheckbox} key={label} />
  );

  const createCategoryCheckboxes = () => categories.map(createCategoryCheckbox);
  const createBrandCheckboxes = () => brands.map(createBrandCheckbox);

  return (
    <S.Container>
      <S.Title>Categories:</S.Title>
      {createCategoryCheckboxes()}
      <S.Title>Brands:</S.Title>
      {createBrandCheckboxes()}
    </S.Container>
  );
};

export default Filter;
