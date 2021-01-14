import React from "react";
import "./BottomHeader.css";
import Sidebar from "./Sidebar";

function BottomHeader() {
  return (
    <div className="bottomHeader">
      <div className="bottomHeader__sidebar">
        <Sidebar />
      </div>
      <div className="bottomHeader__options">
        <ul>
          <li className="bottomHeader__noBorder">Why us?</li>
          <li>For Office</li>
          <li>For Property</li>
          <li>For Home</li>
        </ul>
      </div>
    </div>
  );
}

export default BottomHeader;
