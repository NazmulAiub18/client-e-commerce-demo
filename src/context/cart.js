import React, { createContext, useReducer } from "react";

const CartContext = createContext({
  products: [],
  addProduct: (product) => {},
  deleteProduct: (productId) => {},
  deleteAll: () => {},
  increaseUnit: (productId) => {},
  decreaseUnit: (productId) => {},
});

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      action.payload.unit = 1;
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case "DELETE":
      let index = state.products.findIndex(
        (product) => product._id === action.payload
      );
      state.products.splice(index, 1);
      return {
        ...state,
      };
    case "INCREASE":
      let index1 = state.products.findIndex(
        (product) => product._id === action.payload
      );
      if (state.products[index1].unit > 0) {
        state.products[index1].unit++;
      }
      return {
        ...state,
      };
    case "DECREASE":
      let index2 = state.products.findIndex(
        (product) => product._id === action.payload
      );
      if (state.products[index2].unit > 1) {
        state.products[index2].unit--;
      }
      return {
        ...state,
      };
    case "DELETE_ALL":
      return {
        ...state,
        products: [],
      };
    default:
      return state;
  }
};

const CartProvider = (props) => {
  const [state, dispatch] = useReducer(cartReducer, { products: [] });

  const addProduct = (product) => {
    dispatch({
      type: "ADD",
      payload: product,
    });
  };

  const deleteProduct = (productId) => {
    dispatch({
      type: "DELETE",
      payload: productId,
    });
  };

  const increaseUnit = (productId) => {
    dispatch({
      type: "INCREASE",
      payload: productId,
    });
  };

  const decreaseUnit = (productId) => {
    dispatch({
      type: "DECREASE",
      payload: productId,
    });
  };

  const deleteAll = () => {
    dispatch({
      type: "DELETE_ALL",
    });
  };

  return (
    <CartContext.Provider
      value={{
        products: state.products,
        addProduct,
        deleteProduct,
        increaseUnit,
        decreaseUnit,
        deleteAll,
      }}
      {...props}
    />
  );
};

export { CartContext, CartProvider };
