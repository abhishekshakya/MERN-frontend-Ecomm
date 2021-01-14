import React from "react";
import Loading from "../../molecules/Loading/Loading";
import "./SignUp.css";
import axios from "axios";
import { BaseURL } from "../../../BaseURL";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { addUser } from "../../../redux/user/userActionProvider";
import { checkForToken } from "../../../redux/store";

function SignUp({ user, addUser }) {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const history = useHistory();

  const clickHandler = () => {
    const data = { name: username, email, password };
    setLoading(true);
    // console.log(data);
    (async () => {
      try {
        const res = await axios({
          method: "POST",
          url: `${BaseURL}/auth/signup`,
          data,
          headers: {
            "Content-Type": "application/json",
          },
        });
        setLoading(false);
        setUsername("");
        setEmail("");
        setPassword("");
        setError(null);
        // console.log(res.data);
        addUser({ name: res.data.name, _id: res.data._id });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("_id", res.data._id);
        history.push("/");
        checkForToken();
      } catch (err) {
        setLoading(false);
        setUsername("");
        setEmail("");
        setPassword("");
        setError(err.response.data.message);
        // console.log(err.response.data);
      }
    })();
  };

  return (
    <div className="signup">
      <div
        className="signup__error"
        style={{ backgroundColor: error ? "rgb(238, 61, 61)" : "white" }}
      >
        {error && <p>{error}</p>}
      </div>
      <div className="signup__loading">{loading && <Loading />}</div>
      <label>
        Username
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        E-mail
        <input
          type="email"
          placeholder="xyz@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button onClick={clickHandler}>Signup</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (data) => dispatch(addUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
