import { combineReducers } from "redux";

const issuesReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_PRODUCT":
      return { ...state, products: action.products };
    case "EDIT_PRODUCT":
      let newProducts = state.products.map(item => {
        if (item && item.index === action.product.index) {
          return action.product;
        }
        return item;
      });
      return { ...state, products: newProducts };
    case "CREATE_PRODUCT":
      let newproductz = [...state.products, action.product];
      console.log(`thissssss ${JSON.stringify(action.product)}`);
      console.log(`new ${JSON.stringify(newproductz)}`);
      return { ...state, products: newproductz };
    case "DELETE_PRODUCT":
      let newProductsE = state.products.map(item => {
        if (item && item.index != action.product.index) {
          return item;
        }
      });
      console.log(`thissssss ${JSON.stringify(newProductsE)}`);
      return { ...state, products: newProductsE };
    case "GET_ISSUES":
      return { ...state, ...action.issues };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  products: issuesReducer
});

export default rootReducer;
