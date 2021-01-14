import { SHOW_SIDEBAR } from "./sidebarTypes";
import { HIDE_SIDEBAR } from "./sidebarTypes";

export const showSidebar = () => {
  return {
    type: SHOW_SIDEBAR,
  };
};

export const hideSidebar = () => {
  return {
    type: HIDE_SIDEBAR,
  };
};
