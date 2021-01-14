import React from "react";
import UserInventory from "../../pages/userInventory/UserInventory";
import { connect } from "react-redux";
import SmallCard from "../../atoms/card/SmallCard";
import "./Cart.css";
import AddToCartBtn from "../../atoms/buttons/AddToCartBtn";
import { Link, useHistory } from "react-router-dom";
import { addOrderDB } from "../../../redux/orders/ordersActionProvider";
import { removeFromCart, resetCart } from "../../../redux/cart/actionProvider";

function Cart({ cart, user, addOrderDB, removeFromCart, resetCart }) {
  // console.log(user);
  const history = useHistory();
  let total = 0;
  // console.log(cart);
  const placeOrderHandler = (e) => {
    cart.forEach((item) => addOrderDB(item));
    cart.forEach((item) => removeFromCart(item));
    resetCart();
    // console.log(addOrderDB);
    history.push("/inventory/orders");
  };
  return (
    <div className="cart">
      <UserInventory />
      {user ? (
        cart.length === 0 ? (
          <h2>Add items to your cart...</h2>
        ) : (
          <div className="cart__body">
            <div className="cart__items">
              {cart.map((item) => {
                const price = item.price;
                const offer = item.offer;
                total = total + (price * (100 - offer)) / 100;
                return (
                  <div key={item._id} className="cart__item">
                    <SmallCard payload={item} />
                    <AddToCartBtn payload={item} />
                  </div>
                );
              })}
            </div>
            <div className="cart__placeOrder">
              {/* <div className="cart__placeOrder__upperCol"> */}
              <div className="cart__placeOrder__subtotal">
                <p>Subtotal ({cart.length} items):</p>
                <p>₹ {total.toFixed(2)}</p>
              </div>

              <div className="cart__placeOrder__deliveryCharges">
                <p>Delivery charges:</p>
                <p>₹ 500</p>
              </div>
              <div className="cart__placeOrder__discount">
                <p>Discount:</p>
                <p>-₹ 500</p>
              </div>
              <div className="cart__placeOrder__total">
                <p>Total:</p>
                <p>₹ {total.toFixed(2)}</p>
              </div>
              {/* </div> */}
              <div className="cart__placeOrder__lowerCol">
                <button onClick={placeOrderHandler}>Place Order & Pay</button>
                <Link to="/">
                  <button>Continue Shopping</button>
                </Link>
              </div>
            </div>
          </div>
        )
      ) : (
        <h2>Please login</h2>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addOrderDB: (item) => dispatch(addOrderDB(item)),
    removeFromCart: (item) => dispatch(removeFromCart(item)),
    resetCart: () => dispatch(resetCart()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
