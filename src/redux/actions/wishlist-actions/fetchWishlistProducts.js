import {
  FETCH_WISHLIST_STARTED,
  FETCH_WISHLIST_SUCCESS,
  FETCH_WISHLIST_FAILURE
} from "../types";
import { tokenConfig } from "../auth-actions/tokenConfig";
import axios from "axios";
const AccountService = process.env.REACT_APP_ACCOUNTSERVICE_BASE_URI;

export const fetchWishlistProducts = () => (dispatch, getState) => {
  dispatch(fetchWishlistStarted());

  axios
    .get(`${AccountService}/api/wishlist/userWishlist`, tokenConfig(getState))
    .then(res => {
      dispatch(fetchWishlistSuccess(res.data.wishlist.items));
    })
    .catch(err => {
      dispatch(fetchWishlistFailure(err.response.data.message));
    });
};

const fetchWishlistStarted = () => {
  return {
    type: FETCH_WISHLIST_STARTED
  };
};

const fetchWishlistSuccess = wishlist => {
  return {
    type: FETCH_WISHLIST_SUCCESS,
    payload: { wishlist }
  };
};

const fetchWishlistFailure = error => {
  return {
    type: FETCH_WISHLIST_FAILURE,
    payload: { error }
  };
};
