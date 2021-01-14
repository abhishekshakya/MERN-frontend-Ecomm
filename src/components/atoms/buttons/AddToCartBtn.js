import React from "react";
import "./addToCartBtn.css";
import { addToCart, removeFromCart } from "../../../redux/cart/actionProvider";
import { connect } from "react-redux";

function AddToCartBtn({ cart, payload, addToCart, removeFromCart }) {
  const [click, setClick] = React.useState(
    cart.find((item) => item._id === payload._id)
  );
  const [btnText, setBtnText] = React.useState(
    click ? "REMOVE FROM CART" : "ADD TO CART"
  );
  const clickHandler = () => {
    if (!click) {
      setClick(true);
      setBtnText("REMOVE FROM CART");
      addToCart(payload);
    } else {
      setClick(false);
      setBtnText("ADD TO CART");
      removeFromCart(payload);
    }
  };

  return (
    <div className="addToCartBtn">
      <button onClick={clickHandler}>{btnText}</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => dispatch(addToCart(item)),
    removeFromCart: (item) => dispatch(removeFromCart(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartBtn);
