import { ADD_TO_CART, REMOVE_FROM_CART, RESET_CART } from "./actionTypes";

const initialState = {
  cart: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      return {
        cart: [...state.cart, action.payload],
      };
    }
    case REMOVE_FROM_CART: {
      return {
        cart: state.cart.filter((item) => item._id !== action.payload._id),
      };
    }

    case RESET_CART: {
      return {
        cart: [],
      };
    }
    default: {
      return state;
    }
  }
};
