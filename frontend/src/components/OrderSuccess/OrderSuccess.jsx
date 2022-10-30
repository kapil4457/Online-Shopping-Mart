import React from "react";
import "./OrderSuccess.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
const OrderSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="order-placed-main">
      <div>
        <CheckCircleIcon />
      </div>
      <p>Order Placed</p>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderSuccess;
