import React from "react";
import UserInventory from "../../pages/userInventory/UserInventory";
import { connect } from "react-redux";
import SmallCard from "../../atoms/card/SmallCard";
import "./Wishlist.css";
import AddToCartBtn from "../../atoms/buttons/AddToCartBtn";

function Wishlist({ wishlist, user }) {
  return (
    <div className="wishlist">
      <UserInventory />
      {user ? (
        wishlist.length === 0 ? (
          <h2>Add items to your wishlist...</h2>
        ) : (
          <div className="wishlist__items">
            {wishlist.map((item) => (
              <div key={item._id} className="wishlist__item">
                <SmallCard payload={item} />
                <AddToCartBtn payload={item} />
              </div>
            ))}
          </div>
        )
      ) : (
        <h2> Please login </h2>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    wishlist: state.wishList.wishList,
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(Wishlist);
