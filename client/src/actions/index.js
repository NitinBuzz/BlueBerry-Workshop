import axios from "axios";
import { Products } from "../data/products";

export const decrementCounter = () => ({
  type: "COUNTER_DECREMENT"
});

export const deleteProduct = product => ({
  type: "DELETE_PRODUCT",
  product
});

export const getProduct = () => ({
  type: "GET_PRODUCT",
  products: Products.slice(0, 10)
});

export const editProduct = product => ({
  type: "EDIT_PRODUCT",
  product
});

export const createProduct = product => ({
  type: "CREATE_PRODUCT",
  product
});

export const tweakLoader = loader => ({
  type: "Loader_Tweak",
  loader
});

export const filterIssues2 = key => ({
  type: "FILTER_ISSUES",
  issues: key
});

export const getIssues2 = issues => ({
  type: "GET_ISSUES",
  issues
});

export const filterIssues = (key = "prod", loader) => {
  return dispatch => {
    dispatch(tweakLoader(loader));
    key.toString().trim() == "" ? (key = "prod") : key;
    axios
      .get(`/api/get/issues/search/${key}`)
      .then(res => {
        dispatch(filterIssues2(res.data));
        dispatch(tweakLoader(!loader));
      })
      .catch(error => {
        console.log(`error: ${error}`);
      });
  };
};

export const getIssues = () => {
  return dispatch => {
    axios
      .get("/api/get/issues")
      .then(res => {
        dispatch(getIssues2(res.data.issues));
      })
      .catch(error => {
        console.log(`error: ${error}`);
      });
  };
};
