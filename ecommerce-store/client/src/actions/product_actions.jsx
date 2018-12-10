import axios from 'axios';
import { GET_PRODUCTS_BY_SELL, GET_PRODUCTS_BY_ARRIVAL, GET_BRANDS, GET_DETAILS } from './types';

import { PRODUCT_SERVER } from '../components/utils/gvar';

export function getProductsBySell() {
  // ?sortBy=sold&order=desc&limit=100
  const request = axios
    .get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
    .then(response => response.data);

  return {
    type: GET_PRODUCTS_BY_SELL,
    payload: request
  };
}

export function getProductsByArrival() {
  const request = axios
    .get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
    .then(response => response.data);

  return {
    type: GET_PRODUCTS_BY_ARRIVAL,
    payload: request
  };
}

// ---------------------
//  categories of Product
// ---------------------
// get brands from api
export function getBrands() {
  const request = axios.get(`${PRODUCT_SERVER}/brands`)
  .then(response => response.data);
  return {
    type: GET_BRANDS,
    payload: request
  }
}
// get details of a product
export function getDetails() {
  const request = axios.get(`${PRODUCT_SERVER}/details`)
  .then(response => response.data);
  return {
    type: GET_DETAILS,
    payload: request
  }
}
