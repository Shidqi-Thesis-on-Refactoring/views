import {
  FETCH_PRODUCTS_STARTED,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE
} from "./../types";
import axios from "axios";
import { tokenConfig } from "../auth-actions/tokenConfig";
const ProductService = process.env.REACT_APP_PRODUCTSERVICE_BASE_URI;

export const fetchProducts = (pageNumber, perPage) => {
  let params = { page: pageNumber, perPage };

  return dispatch => {
    dispatch(fetchProductsStarted());

    axios
      .get(`${ProductService}/api/product`, tokenConfig(null, params))
      .then(res => {
        let products = res.data.products;
        let pagesCount = res.data.pagesCount;
        console.log(products)
        dispatch(fetchProductsSuccess(products, pagesCount, perPage));
      })
      .catch(error => {
        dispatch(fetchProductsFailure(error.message));
      });
  };
};

const fetchProductsStarted = () => {
  return {
    type: FETCH_PRODUCTS_STARTED
  };
};

const fetchProductsSuccess = (products, pagesCount) => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: {
      products,
      pagesCount
    }
  };
};

const fetchProductsFailure = error => {
  return {
    type: FETCH_PRODUCTS_FAILURE,
    payload: {
      error
    }
  };
};
