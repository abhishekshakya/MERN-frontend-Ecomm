import axios from "axios";
import { BaseURL } from "../../BaseURL";
import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  RESET_WISHLIST,
} from "./wishListActions";

export const addToWishList2 = (item) => {
  return {
    type: ADD_TO_WISHLIST,
    payload: item,
  };
};

export const removeFromWishList2 = (item) => {
  return {
    type: REMOVE_FROM_WISHLIST,
    payload: item,
  };
};

export const resetWishlist = () => {
  return {
    type: RESET_WISHLIST,
  };
};

export const addToWishList = (item) => async (disptach) => {
  const token = localStorage.getItem("token");
  const _id = localStorage.getItem("_id");
  const data = {
    _id: _id,
    item_id: item._id,
    add: true,
  };
  try {
    await axios.post(`${BaseURL}/wishlist/items`, data, {
      headers: {
        auth_token: `Bearer ${token}`,
      },
    });
    disptach(addToWishList2(item));
  } catch (err) {
    console.log(err);
  }
};

export const removeFromWishList = (item) => async (disptach) => {
  const token = localStorage.getItem("token");
  const _id = localStorage.getItem("_id");
  const data = {
    _id: _id,
    item_id: item._id,
    add: false,
  };
  try {
    await axios.post(`${BaseURL}/wishlist/items`, data, {
      headers: {
        auth_token: `Bearer ${token}`,
      },
    });
    disptach(removeFromWishList2(item));
  } catch (err) {
    console.log(err);
  }
};
