import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import axios from "../axios";

function Login() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();

    axios
      .post("/user/login", {
        username,
        password,
      })
      .then((user) => {
        localStorage.setItem("username", user.data.username);
        history.push("/chat");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      {" "}
      <div className="login__container">
        <h1> Log - in </h1>{" "}
        <form>
          <h5> E - mail / Username </h5>{" "}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />{" "}
          <h5> Password </h5>{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />{" "}
          <button type="submit" onClick={login} className="login__signInButton">
            {" "}
            Log In{" "}
          </button>{" "}
          <Link to="/register">
            <button type="submit" className="login__signInButton">
              {" "}
              Register{" "}
            </button>
          </Link>
        </form>{" "}
        <p>
          By signing - in you agree to the Chat application Conditions of Use &
          Sale.Please see our Privacy Notice, our Cookies Notice and our
          Interest - Based Ads Notice.{" "}
        </p>{" "}
      </div>{" "}
    </div>
  );
}

export default Login;
