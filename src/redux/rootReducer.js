import { combineReducers } from "redux";
import { sidebarReducer } from "./sidebar/sidebarReducer";
import { cartReducer } from "./cart/reducers";
import { wishListReducer } from "./wishlist/wishListReducer";
import userReducer from "./user/userReducer";
import { orderReducer } from "./orders/ordersReducer";
import { addressReducer } from "./address/addressReducer";

const rootReducer = combineReducers({
  slider: sidebarReducer,
  cart: cartReducer,
  wishList: wishListReducer,
  user: userReducer,
  orders: orderReducer,
  address: addressReducer,
});

export default rootReducer;
