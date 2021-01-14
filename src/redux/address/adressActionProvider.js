import { ADD_ADDRESS } from "./addressActions";
import axios from "axios";
import { BaseURL } from "../../BaseURL";

export const addAddress = (item) => {
  return {
    type: ADD_ADDRESS,
    payload: item, //array of addresses
  };
};

export const getAddressDB = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("_id");
  try {
    const resp = await axios.get(`${BaseURL}/address/${user_id}`, {
      headers: {
        auth_token: `Bearer ${token}`,
      },
    });
    console.log(resp.data[0]);
    const data = resp.data[0].address;
    dispatch(addAddress(data));
  } catch (err) {
    console.log("adress redux error");
    console.log(err);
  }
};

export const addAddressDB = (add, heading) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("_id");
  const data = {
    id,
    add,
    heading,
    user_default: false,
  };
  try {
    await axios.post(`${BaseURL}/address/add`, data, {
      headers: {
        auth_token: `Bearer ${token}`,
      },
    });
    dispatch(getAddressDB());
  } catch (err) {
    console.log(err);
  }
};

export const editAddressDB = (add_id, new_add) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("_id");
  const data = {
    id,
    add_id,
    new_add,
  };
  try {
    //REMAINDER
    await axios.post(`${BaseURL}/address/edit`, data, {
      headers: {
        auth_token: `Bearer ${token}`,
      },
    });
    dispatch(getAddressDB());
  } catch (err) {
    console.log(err);
  }
};

export const removeAddressDB = (add_id) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("_id");
  const data = {
    id,
    add_id,
  };
  try {
    //REMAINDER
    await axios.post(`${BaseURL}/address/remove`, data, {
      headers: {
        auth_token: `Bearer ${token}`,
      },
    });
    dispatch(getAddressDB());
  } catch (err) {
    console.log(err);
  }
};

export const makeDefault = (add_id) => async (dispatch) => {
  console.log("you clicked me", add_id);
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("_id");
  const data = {
    id,
    add_id,
  };
  try {
    //REMAINDER
    await axios.post(`${BaseURL}/address/default`, data, {
      headers: {
        auth_token: `Bearer ${token}`,
      },
    });
    dispatch(getAddressDB());
  } catch (err) {
    console.log(err);
  }
};
