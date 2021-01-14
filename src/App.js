import "./App.css";
import Header from "./components/Header/Header.js";
import Body from "./components/Body/Body.js";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import ShoppingProduct from "./components/pages/shoppingProduct/ShoppingProduct";
import ShopViewAll from "./components/pages/shopViewAll/ShopViewAll";
import Orders from "./components/molecules/orders/Orders";
import Wishlist from "./components/molecules/wishlist/Wishlist";
import Address from "./components/molecules/address/Address";
import Cart from "./components/molecules/cart/Cart";
import AuthRouter from "./components/pages/login/AuthRouter";
import { connect } from "react-redux";
import { IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";

function App({ user }) {
  console.log(user);
  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route path="/inventory/orders" exact component={Orders} />
          <Route path="/inventory/wishlist" exact component={Wishlist} />
          <Route path="/inventory/address" exact component={Address} />
          <Route path="/inventory/cart" exact component={Cart} />
          <Route path="/shopViewAll/:category" component={ShopViewAll} />
          <Route path="/shop/:id" component={ShoppingProduct} />
          <Route path="/" component={Body} />
        </Switch>
        <Footer />
        {!user && (
          <Route path="/auth">
            <Link to="/">
              <div className="app_bg"></div>
            </Link>
            <Link to="/">
              <div className="authRouter__close">
                <IconButton>
                  <Close fontSize="large" color="inherit" />
                </IconButton>
              </div>
            </Link>
            <AuthRouter />
          </Route>
        )}
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(App);
