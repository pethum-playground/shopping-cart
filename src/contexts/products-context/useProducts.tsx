import { useCallback } from 'react';

import { useProductsContext } from './ProductsContextProvider';
import { IProduct } from 'models';
import {getProductCategories, getProducts} from 'services/products';
import {FilterTypes} from "../../utils/filterTypes";

const useProducts = () => {
  const {
    isFetching,
    setIsFetching,
    products,
    setProducts,
    categories,
    setCategories,
    brands,
    setBrands,
    filters,
    setFilters,
  } = useProductsContext();

  const fetchProducts = useCallback(() => {
    setIsFetching(true);
    getProducts().then((products: IProduct[]) => {
      setIsFetching(false);
      setProducts(products);

      const brands = products.map(p => p.brand);
      const unique = brands.filter(function(item, pos) {
        return brands.indexOf(item) == pos;
      });
      setBrands(unique);
    });
  }, [setIsFetching, setProducts, setBrands]);

  const fetchCategories = useCallback(() => {
    getProductCategories().then((categories: string[]) => {
      setCategories(categories);
    });
  }, [setCategories]);

  const filterProducts = (filters: string[], type: FilterTypes) => {
    setIsFetching(true);

    getProducts().then((products: IProduct[]) => {
      setIsFetching(false);
      let filteredProducts;

      if (filters && filters.length > 0) {
        filteredProducts = products.filter((p: IProduct) => {
            switch (type) {
              case FilterTypes.Category:
                return filters.find((filter: string) => p.category == filter);
              case FilterTypes.Brand:
                return filters.find((filter: string) => p.brand == filter);
            }
          }
        );
      } else {
        filteredProducts = products;
      }

      setFilters(filters);
      setProducts(filteredProducts);
    });
  };

  return {
    isFetching,
    fetchProducts,
    products,
    fetchCategories,
    categories,
    brands,
    filterProducts,
    filters,
  };
};

export default useProducts;
