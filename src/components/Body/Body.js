import React from "react";
import "./Body.css";
import ItemTray from "../molecules/itemsTray/ItemTray";

function Body() {
  return (
    <div className="body">
      <ItemTray category="Bedsheets" />
      <ItemTray category="T-Shirts" />
      <ItemTray category="Clothes" />
      <ItemTray category="Curtains" />
      <ItemTray category="Mugs" />
    </div>
  );
}

export default Body;
