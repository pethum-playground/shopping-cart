import axios from 'axios';
import {IGetCategoryResponse, IGetProductsResponse} from 'models';

export const getProducts = async () => {
  let response: IGetProductsResponse;

  response = await axios.get('https://dummyjson.com/products');

  const { products } = response.data || [];

  return products;
};

export const getProductCategories = async () => {
  let response: IGetCategoryResponse;

  response = await axios.get('https://dummyjson.com/products/categories');

  return response.data;
};
