import React from "react";
import { useNavigate } from "react-router";
import "./MyOrders.css";
const OrderItemCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div className="item-card">
      <img src="logo.png" alt="" />
      <div>
        <div>
          <b>Item name </b>
          <span>{item?.name}</span>
        </div>
        <div>
          <b>Item Price </b>
          <span>₹ {item?.price}</span>
        </div>
        <div>
          <b>Item Quantity </b>
          <span>{item.quantity}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;
