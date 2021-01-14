import { ADD_ADDRESS } from "./addressActions";

const intialState = {
  address: [],
};

export const addressReducer = (state = intialState, action) => {
  switch (action.type) {
    case ADD_ADDRESS: {
      return {
        ...state,
        address: action.payload,
      };
    }

    default:
      return state;
  }
};
