import { ADD_TO_CART, REMOVE_FROM_CART, RESET_CART } from "./actionTypes";
import axios from "axios";
import { BaseURL } from "../../BaseURL";

export const addToCart2 = (item) => {
  return {
    type: ADD_TO_CART,
    payload: item,
  };
};

export const removeFromCart2 = (item) => {
  return {
    type: REMOVE_FROM_CART,
    payload: item,
  };
};

export const resetCart = () => {
  return {
    type: RESET_CART,
  };
};

export const addToCart = (item) => async (disptach) => {
  const token = localStorage.getItem("token");
  const _id = localStorage.getItem("_id");
  const data = {
    _id: _id,
    item_id: item._id,
    add: true,
  };
  try {
    await axios.post(`${BaseURL}/cart/items`, data, {
      headers: {
        auth_token: `Bearer ${token}`,
      },
    });
    disptach(addToCart2(item));
  } catch (err) {
    console.log(err);
  }
};

export const removeFromCart = (item) => async (disptach) => {
  const token = localStorage.getItem("token");
  const _id = localStorage.getItem("_id");
  const data = {
    _id: _id,
    item_id: item._id,
    add: false,
  };
  try {
    await axios.post(`${BaseURL}/cart/items`, data, {
      headers: {
        auth_token: `Bearer ${token}`,
      },
    });
    disptach(removeFromCart2(item));
  } catch (err) {
    console.log(err);
  }
};
