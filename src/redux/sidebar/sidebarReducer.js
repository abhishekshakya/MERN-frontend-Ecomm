import { SHOW_SIDEBAR } from "./sidebarTypes";
import { HIDE_SIDEBAR } from "./sidebarTypes";

const initialState = {
  sidebar: false,
};

export const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SIDEBAR: {
      return {
        ...state,
        sidebar: true,
      };
    }

    case HIDE_SIDEBAR: {
      return {
        ...state,
        sidebar: false,
      };
    }

    default: {
      return state;
    }
  }
};
