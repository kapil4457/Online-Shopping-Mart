import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "./Cart.css";
import CartCard from "./CartCard";
const Cart = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const getData = async () => {
    if (localStorage.getItem("cartItems")) {
      var tempD = JSON.parse(localStorage.getItem("cartItems"));
      setData(tempD);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {data.length == 0 ? (
        <div className="no-items-in-cart">
          {" "}
          <h2>No items in Cart</h2>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="main-cart">
          <div className="left-cart">
            {data.map((item, key) => (
              <CartCard item={item} key={key} />
            ))}
          </div>
          <div className="right-cart"></div>
        </div>
      )}
    </>
  );
};

export default Cart;
