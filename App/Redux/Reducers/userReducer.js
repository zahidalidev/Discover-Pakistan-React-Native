import createReducer from "../Library/createReducer";
import * as types from "./../Actions/types";
import { initialState } from "./initialState";

export const userReducer = createReducer(initialState, {
  [types.SET_LOADER_STATUS](state, action) {
    return {
      ...state,
      isLoader: action.payload
    };
  },
  [types.SET_LOGIN_STATUS](state, action) {
    if(action.payload){
      return {
        ...state,
        isLoggedIn: action.payload
      };
    }else{
      return { ...initialState }
    }
  },
  [types.SET_USER_DATA](state, action) {
    return {
      ...state,
      userData: action.payload
    };
  },
  [types.SET_CATEGORY](state, action) {
    return {
      ...state,
      category: action.payload
    };
  },
  [types.SET_CATEGORY_DATA](state, action) {
    return {
      ...state,
      categoryDetails: action.payload
    };
  },
  [types.SET_CART_LIST](state, action) {
    return {
      ...state,
      cartList: action.payload ? action.payload : []
    };
  },

});