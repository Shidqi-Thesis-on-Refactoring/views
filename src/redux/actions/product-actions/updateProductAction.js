import { UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAILURE } from "./../types";
import axios from "axios";
import { tokenConfig } from "./../auth-actions/tokenConfig";
const ProductService = process.env.REACT_APP_PRODUCTSERVICE_BASE_URI;

export const updateProduct = (id, product) => (dispatch, getState) => {
  return new Promise((reslove, reject) => {
    // send our data as a multipart/form-data instead of application/json
    const formData = new FormData();
    // for (const x in product) {
    //   if (x === "productImage") {
    //     for (let i = 0; i < product.productImage.length; i++) {
    //       formData.append(x, product.productImage[i]);
    //     }
    //   }
    //   formData.append("productImage", product.productImage);
    // }
    if (product.productImage) {
      Array.from(product.productImage).forEach((file, index) => {
        formData.append("productImage", file); // Append with the same key for multiple files
      });
    }
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("numberInStock", product.numberInStock);

    axios
      .post(`${ProductService}/api/product/${id}/update`, formData, tokenConfig(getState, null, "application/form-data"))
      .then(res => {
        let newProduct = res.data.product;
        let successMessage = res.data.message;

        dispatch(updateProductSuccess(id, newProduct, successMessage));
        reslove(successMessage);
      })
      .catch(err => {
        let errorMessage = err.response.data.message;

        dispatch(updateProductFailure(errorMessage));
        reject(errorMessage);
      });
  });
};

const updateProductSuccess = (id, newProduct, successMessage) => {
  return {
    type: UPDATE_PRODUCT_SUCCESS,
    payload: {
      id,
      newProduct,
      successMessage
    }
  };
};

const updateProductFailure = error => {
  return {
    type: UPDATE_PRODUCT_FAILURE,
    payload: {
      error
    }
  };
};
