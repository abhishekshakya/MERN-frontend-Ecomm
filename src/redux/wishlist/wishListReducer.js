import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  RESET_WISHLIST,
} from "./wishListActions";

const initialState = {
  wishList: [],
};

export const wishListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST: {
      return {
        wishList: [...state.wishList, action.payload],
      };
    }
    case REMOVE_FROM_WISHLIST: {
      return {
        wishList: state.wishList.filter(
          (item) => item._id !== action.payload._id
        ),
      };
    }
    case RESET_WISHLIST: {
      return {
        wishList: [],
      };
    }
    default: {
      return state;
    }
  }
};
