import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";
import { logger } from "redux-logger";
import axios from "axios";
import { BaseURL } from "../BaseURL";
import { addUser, removeUser } from "./user/userActionProvider";
import thunk from "redux-thunk";
import { addToCart2, resetCart } from "./cart/actionProvider";
import {
  addToWishList2,
  resetWishlist,
} from "./wishlist/wishlistActionProvider";
import { addOrder, resetOrder } from "./orders/ordersActionProvider";
import { getAddressDB } from "./address/adressActionProvider";

const checkForToken = async () => {
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const _id = localStorage.getItem("_id");
  try {
    if (!token) {
      throw Error("token error");
    }
    const res = await axios.get(`${BaseURL}/auth/${_id}`, {
      headers: {
        auth_token: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    console.log("hit response");
    store.dispatch(addUser({ token, name, _id }));

    res.data[0].cart.forEach(async (elem) => {
      const data = await axios.get(`${BaseURL}/api/item/${elem}`);
      store.dispatch(addToCart2(data.data[0]));
    });

    res.data[0].wishList.forEach(async (elem) => {
      const data = await axios.get(`${BaseURL}/api/item/${elem}`);
      store.dispatch(addToWishList2(data.data[0]));
    });

    const orders = await axios.get(`${BaseURL}/order/get/${_id}`, {
      headers: {
        auth_token: `Bearer ${token}`,
      },
    });
    // console.log(orders);
    orders.data.forEach(async (order) => {
      const status = order.status;
      const date = order.date;
      const data = await axios.get(`${BaseURL}/api/item/${order.item_id}`);
      // console.log(data.data);
      store.dispatch(
        addOrder({
          ...data.data[0],
          status,
          date,
          _id: order._id,
          item_id: order.item_id,
        })
      );
    });
    store.dispatch(getAddressDB());
  } catch (err) {
    console.log("hit error " + err);
    store.dispatch(removeUser());
    store.dispatch(resetCart());
    store.dispatch(resetWishlist());
    store.dispatch(resetOrder());
  }
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, thunk))
);

checkForToken();

export { store, checkForToken };
