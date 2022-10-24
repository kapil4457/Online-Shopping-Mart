import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [transformation, setTransformation] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassworda] = useState("");
  const [avatar, setAvatar] = useState();
  const moveLeft = () => {
    setTransformation(-32);
  };
  const moveRight = () => {
    setTransformation(0);
  };

  const loginTrigger = async () => {
    const config = { headers: { "Content-Type": "application/json" } };

    try {
      await axios.post("/api/v1/login", { email, password }, config);
      navigate("/account");
    } catch (err) {
      console.log(err);
      const status = err.response.status;
      if (status === 400) {
        alert("Incorrect Email or Password");
      }
    }
  };
  return (
    <div className="main-login-page">
      <div className="get-in-card">
        <div
          className="login-container"
          style={{ transform: `translateX(${transformation}rem)` }}
        >
          <h3>Login</h3>
          <div className="email">
            <label htmlFor="">Email </label>
            <input
              type="email"
              className="em"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="password">
            <label htmlFor="">Password </label>
            <input
              type="password"
              className="pass"
              value={password}
              onChange={(e) => {
                setPassworda(e.target.value);
              }}
            />
          </div>

          <button className="submit" onClick={loginTrigger}>
            Login
          </button>
          <p>
            Not registered yet ? <span onClick={moveLeft}>Register</span>
          </p>
        </div>
        <div
          className="register-container"
          style={{ transform: `translateX(${transformation}rem)` }}
        >
          <h3>Register</h3>
          <div className="name">
            <label htmlFor="">Name </label>
            <input
              type="text"
              className="na"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="email">
            <label htmlFor="">Email </label>
            <input
              type="email"
              className="em"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="password">
            <label htmlFor="">Password </label>
            <input
              type="password"
              className="pass"
              value={password}
              onChange={(e) => {
                setPassworda(e.target.value);
              }}
            />
          </div>
          <div className="avatar">
            <label htmlFor="">Avatar </label>
            <input
              type="file"
              value={avatar}
              onChange={(e) => {
                setAvatar(e.target.value);
              }}
            />
          </div>
          <button className="submit">Register</button>

          <p>
            Already registered ? <span onClick={moveRight}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
