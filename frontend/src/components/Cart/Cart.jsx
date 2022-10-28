import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Cart.css";
import CartCard from "./CartCard";
const Cart = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [GST, setGST] = useState();
  const [Subtotal, setSubTotal] = useState();
  const [total, setTotal] = useState();
  const getData = async () => {
    if (localStorage.getItem("cartItems")) {
      var tempD = JSON.parse(localStorage.getItem("cartItems"));
      setData(tempD);

      var temp = 0;
      data.forEach((item) => {
        temp += item.quantity * item.price;
      });
      setSubTotal(temp);
      setGST(temp * 0.1);

      setTotal(temp + GST);
    }
  };

  useEffect(() => {
    getData();
  }, [data]);
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
          <div className="right-cart">
            <div className="total-card">
              <div>
                <b>Subtotal : </b>
                <p>{Subtotal}</p>
              </div>
              <div>
                <b>GST : </b>
                <p>{GST}</p>
              </div>
              <div>
                <b>Total : </b>
                <p>{total}</p>
              </div>
              <button className="proceed-to-payment-btn">
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
