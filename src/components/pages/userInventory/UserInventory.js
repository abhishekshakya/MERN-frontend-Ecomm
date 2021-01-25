import React from "react";
import "./userInventory.css";
import { Link, useLocation } from "react-router-dom";

function UserInventory({ match }) {
  const style = {
    color: "#414141",
    fontWeight: "bold",
  };
  const location = useLocation().pathname.split("/")[2];
  //   console.log(location);
  return (
    <div className="inventory">
      <Link to="/inventory/wishlist">
        <span style={location === "wishlist" ? style : {}}>My Wishlist</span>
      </Link>
      <Link to="/inventory/orders">
        <span style={location === "orders" ? style : {}}>My Orders</span>
      </Link>
      <Link to="/inventory/cart">
        <span style={location === "cart" ? style : {}}>My Cart</span>
      </Link>
      <Link to="/inventory/address">
        <span style={location === "address" ? style : {}}>My Address</span>
      </Link>
      <Link to="/inventory/addItemInterface">
        <span style={location === "addItemInterface" ? style : {}}>
          Sell Products
        </span>
      </Link>
    </div>
  );
}

export default UserInventory;
