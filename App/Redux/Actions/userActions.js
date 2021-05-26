export const mapStateToProps = state => {
  let store = state.userReducer
  return {
    isLoader: store.isLoader,
    isLoggedIn: store.isLoggedIn,
    userData: store.userData,
    getCategory: store.category,
    getCatDetails: store.categoryDetails,
    getCartList: store.cartList,
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    setLoader: status => {
      dispatch({ type: "SET_LOADER_STATUS", payload: status });
    },
    setLoginStatus: status => {
      dispatch({ type: "SET_LOGIN_STATUS", payload: status });
    },
    setUserData: data => {
      if(data !== undefined){
        dispatch({ type: "SET_USER_DATA", payload: data });
      }else{
        dispatch({ type: "SET_USER_DATA", payload: {} });
      }
    },

    setCategory: data => {
      if(data !== undefined){
        dispatch({ type: "SET_CATEGORY", payload: data });
      }else{
        dispatch({ type: "SET_CATEGORY", payload: {} });
      }
    },
    setCatDetails: data => {
      if(data !== undefined){
        dispatch({ type: "SET_CATEGORY_DATA", payload: data });
      }else{
        dispatch({ type: "SET_CATEGORY_DATA", payload: {} });
      }
    },
    setCartList: data => {
      if(data && typeof(data) === "object"){
        dispatch({ type: "SET_CART_LIST", payload: data });
      }else{
        dispatch({ type: "SET_CART_LIST", payload: [] });
      }
    },
  };
};