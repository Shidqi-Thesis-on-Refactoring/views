import {
  FETCH_SINGLE_PRODUCT_STARTED,
  FETCH_SINGLE_PRODUCT_SUCCESS,
  FETCH_SINGLE_PRODUCT_FAILURE
} from "./../types";
import axios from "axios";
const ProductService = process.env.REACT_APP_PRODUCTSERVICE_BASE_URI;

export const fetchSingleProductAction = id => {
  return dispatch => {
    dispatch(fetchSingleProductStarted());
    axios
      .get(`${ProductService}/api/product/${id}`)
      .then(res => {
        dispatch(fetchSingleProductSuccess(res.data));
      })
      .catch(error => {
        dispatch(fetchSingleProductFailure(error.message));
      });
  };
};

const fetchSingleProductStarted = () => {
  return {
    type: FETCH_SINGLE_PRODUCT_STARTED
  };
};

const fetchSingleProductSuccess = product => {
  return {
    type: FETCH_SINGLE_PRODUCT_SUCCESS,
    payload: {
      product
    }
  };
};

const fetchSingleProductFailure = error => {
  return {
    type: FETCH_SINGLE_PRODUCT_FAILURE,
    payload: {
      error
    }
  };
};
