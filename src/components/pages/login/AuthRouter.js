import React from "react";
import "./AuthRouter.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import Welcome from "./Welcome";

function AuthRouter() {
  return (
    <div className="authRouter">
      <Router>
        <div className="authRouter__left">
          <Link to="/auth/login">
            <p>Login</p>
          </Link>
          <Link to="/auth/signup">
            <p>Signup</p>
          </Link>
        </div>
        <div className="authRouter__right">
          <Switch>
            <Route path="/auth" exact component={Welcome} />
            <Route path="/auth/login" exact component={Login} />
            <Route path="/auth/signup" exact component={SignUp} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default AuthRouter;
