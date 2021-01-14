import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteIcon from "@material-ui/icons/Favorite";

import "./Header.css";
import BottomHeader from "./BottomHeader";
import BottomTags from "./BottomTags";

import { connect } from "react-redux";
import { showSidebar } from "../../redux/sidebar/sidebarActions";
import { Link } from "react-router-dom";
import { removeUser } from "../../redux/user/userActionProvider";
import { resetCart } from "../../redux/cart/actionProvider";
import { resetWishlist } from "../../redux/wishlist/wishlistActionProvider";

function Header(props) {
  // const [clicked, setClicked] = useState(false);
  // console.log(typeof props.user);

  const logoutHandler = () => {
    props.removeUser();
    props.resetCart();
    props.resetWishlist();
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("_id");
  };

  return (
    <div className="header">
      <div className="header__combined">
        <div className="header__upper">
          <div className="header__left">
            <MenuIcon
              className="header__left__menuIcon"
              fontSize="large"
              onClick={props.showSidebar}
            />
            <div className="header__logo">
              {/* <img src="https://i.stack.imgur.com/l4UYz.png" alt="" /> */}
            </div>
            <div className="header__name">
              <Link to="/">
                <p>LIVING DESIRE</p>
              </Link>
            </div>
          </div>

          <div className="header__search">
            <input
              className="header__searchInput"
              type="text"
              placeholder="Search"
            />
            <SearchIcon className="header__searchIcon" />
          </div>

          <div className="header__right">
            <Link to="/inventory/cart">
              <div className="header__right__cart">
                <ShoppingCartIcon fontSize="large" />
                {props.user && (
                  <div className="header__right__cart__count">
                    {props.cart.length}
                  </div>
                )}
                <span>CART</span>
              </div>
            </Link>
            <Link to="/inventory/wishlist">
              <div className="header__right__wishlist">
                <FavoriteIcon fontSize="large" />
                {props.user && (
                  <div className="header__right__wishlist__count">
                    {props.wishList.length}
                  </div>
                )}
                <span>WISH LIST</span>
              </div>
            </Link>

            {!props.user ? (
              <Link to="/auth">
                <button className="header__login">LOGIN/SIGNUP</button>
              </Link>
            ) : (
              <Link to="/">
                <button className="header__login" onClick={logoutHandler}>
                  LOG-OUT
                </button>
              </Link>
            )}
          </div>
        </div>
        <BottomTags />
      </div>
      <BottomHeader />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    wishList: state.wishList.wishList,
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showSidebar: () => dispatch(showSidebar()),
    removeUser: () => dispatch(removeUser()),
    resetCart: () => dispatch(resetCart()),
    resetWishlist: () => dispatch(resetWishlist()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
