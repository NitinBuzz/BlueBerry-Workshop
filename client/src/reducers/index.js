import { combineReducers } from "redux";

const fakeReducer = (state = {}, action) => {
  switch (action.type) {
    case "Loader_Tweak":
      return action.loader == true ? false : true;
    case "COUNTER_INCREMENT":
      return state + 1;
    case "COUNTER_DECREMENT":
      return state;
    default:
      return state;
  }
};

const issuesReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_PRODUCT":
      return { ...state, products: action.products };
    case "GET_ISSUES":
      return { ...state, ...action.issues };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  fakeReducer,
  products: issuesReducer
});

export default rootReducer;
