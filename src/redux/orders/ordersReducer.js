import { ADD_ORDER, REMOVE_ORDER, RESET_ORDER } from "./ordersActions";

const intialState = {
  orders: [],
};

export const orderReducer = (state = intialState, action) => {
  switch (action.type) {
    case ADD_ORDER: {
      return {
        orders: [...state.orders, action.payload],
      };
    }

    case REMOVE_ORDER: {
      return {
        orders: state.orders.filter(
          (order) => order._id !== action.payload._id
        ),
      };
    }

    case RESET_ORDER: {
      return {
        orders: [],
      };
    }
    default:
      return state;
  }
};
