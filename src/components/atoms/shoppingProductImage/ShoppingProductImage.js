import React, { useState } from "react";
import "./ShoppingProductImage.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { connect } from "react-redux";
import { addToCart } from "../../../redux/cart/actionProvider";
import {
  addToWishList,
  removeFromWishList,
} from "../../../redux/wishlist/wishlistActionProvider";
import { useHistory } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

function ShoppingProductImage({
  productData,
  addToCart,
  addToWishList,
  removeFromWishList,
  wishList,
  cart,
  user,
}) {
  const [favorite, setFavorite] = useState(
    wishList.find((element) => element._id === productData._id)
  );
  const history = useHistory();
  const ScrollRef = React.useRef();

  const favoriteHandler = () => {
    if (!user) {
      history.push("/auth");
      return;
    }
    if (!favorite) {
      const help = (payload) => addToWishList(payload);
      help(productData);
      setFavorite(true);
    } else {
      const help = (payload) => removeFromWishList(payload);
      help(productData);
      setFavorite(false);
    }
  };

  const addToCartHandler = () => {
    if (!user) {
      history.push("/auth");
      return;
    }
    if (!cart.find((elem) => elem._id === productData._id)) {
      addToCart(productData);
    }
  };
  // console.log()

  const handler = (dir) => {
    if (dir === "up")
      ScrollRef.current.scroll(0, ScrollRef.current.scrollTop - 150);
    else ScrollRef.current.scroll(0, ScrollRef.current.scrollTop + 150);
    // console.log(ScrollRef.current.scrollTop);
  };

  return (
    <div className="shoppingProductImage">
      <div className="shoppingProductImage__leftPane">
        <IconButton
          className="shoppingProductImage__leftPane__up"
          onClick={() => handler("up")}
        >
          <ArrowDropUpIcon />
        </IconButton>
        <div
          ref={ScrollRef}
          // onScroll={handler}
          className="shoppingProductImage__leftPane_smallerPics"
        >
          <img src={productData && productData.imageURL} alt="" />
          <img src={productData && productData.imageURL} alt="" />
          <img src={productData && productData.imageURL} alt="" />
          <img src={productData && productData.imageURL} alt="" />
          <img src={productData && productData.imageURL} alt="" />
        </div>
        <IconButton
          className="shoppingProductImage__leftPane__down"
          onClick={() => handler("down")}
        >
          <ArrowDropDownIcon />
        </IconButton>
      </div>
      <div className="shoppingProductImage__rightPane">
        <div
          className="shoppingProductImage__rightPane__heart"
          onClick={favoriteHandler}
        >
          {favorite && user ? (
            <FavoriteIcon fontSize="large" color="error" />
          ) : (
            <FavoriteBorderIcon fontSize="large" />
          )}
        </div>
        <div className="shoppingProductImage__rightPane__image">
          <div className="shoppingProductImage__rightPane__imageController">
            <img src={productData && productData.imageURL} alt="" />
          </div>
        </div>
        <div className="shoppingProductImage__rightPane__buttons">
          <button
            className="shoppingProductImage__rightPane__buttons__addToCart"
            onClick={addToCartHandler}
          >
            ADD TO CART
          </button>
          <button
            className="shoppingProductImage__rightPane__buttons__buyNow"
            onClick={addToCartHandler}
          >
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  addToCart: (data) => dispatch(addToCart(data)),
  addToWishList: (data) => dispatch(addToWishList(data)),
  removeFromWishList: (data) => dispatch(removeFromWishList(data)),
});
const mapStateToProps = (state) => ({
  wishList: state.wishList.wishList,
  cart: state.cart.cart,
  user: state.user.user,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingProductImage);
