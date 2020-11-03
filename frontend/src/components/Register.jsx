import React, { useState } from "react";
import "./Register.css";
import { useHistory } from "react-router-dom";
import axios from "../axios";

function Register() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const register = (e) => {
    e.preventDefault();

    axios
      .post("/register", {
        email: email,
        username: username,
        password: password,
      })

      .then((res) => {
        localStorage.setItem("username", res.data.username);
        history.push("/chat");
      })
      .catch((error) => alert(error.message));
  };
  function redirect() {
    history.push("/login");
  }

  return (
    <div className="login">
      <div className="login__container">
        <h1> Register </h1>
        <form>
          <h5> E - mail </h5>{" "}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5> Username </h5>{" "}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <h5> Password </h5>{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            onClick={register}
            className="login__signInButton"
          >
            {" "}
            Register{" "}
          </button>{" "}
        </form>{" "}
        <button onClick={redirect} className="login__registerButton ">
          {" "}
          Log in to your Account{" "}
        </button>{" "}
        <p>
          By Registering - in you agree to the Chat application Conditions of
          Use & Sale.Please see our Privacy Notice, our Cookies Notice and our
          Interest - Based Ads Notice.{" "}
        </p>
      </div>{" "}
    </div>
  );
}

export default Register;
