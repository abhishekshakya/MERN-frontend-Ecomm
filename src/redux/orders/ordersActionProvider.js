import { BaseURL } from "../../BaseURL";
import { ADD_ORDER, REMOVE_ORDER, RESET_ORDER } from "./ordersActions";
import axios from "axios";

export const addOrder = (item) => {
  return {
    type: ADD_ORDER,
    payload: item,
  };
};

export const removeOrder = (item) => {
  return {
    type: REMOVE_ORDER,
    payload: item,
  };
};

export const resetOrder = () => {
  return {
    type: RESET_ORDER,
  };
};

export const addOrderDB = (item) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const _id = localStorage.getItem("_id");
  const date = new Date().toISOString();
  const status = parseInt(Math.round(Math.random() * 2));
  //   console.log(status);
  const data = {
    item_id: item._id,
    user_id: _id,
    date,
    status,
  };

  try {
    const resp = await axios.post(`${BaseURL}/order/add`, data, {
      headers: {
        auth_token: `Bearer ${token}`,
      },
    });
    console.log({
      ...item,
      _id: resp.data._id,
      date,
      status,
      item_id: item._id,
    });
    dispatch(
      addOrder({ ...item, _id: resp.data._id, date, status, item_id: item._id })
    );
  } catch (err) {
    console.log(err);
  }
};

export const removeOrderDB = (order) => async (dispatch) => {
  console.log(order);
  const token = localStorage.getItem("token");
  const _id = localStorage.getItem("_id");
  const data = {
    _id: order._id,
    user_id: _id,
  };
  try {
    await axios.post(`${BaseURL}/order/cancel`, data, {
      headers: {
        auth_token: `Bearer ${token}`,
      },
    });
    dispatch(removeOrder(order));
  } catch (err) {
    console.log(err);
  }
};
