import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { getAllOrder } from "../../redux/actions/orderAction";
import Sidebar from "../SideBar/Sidebar";

import "./Order.css";
import OrderCard from "./OrderCard";
const Orders = () => {
  const navigate = useNavigate();
  const { order } = useSelector((state) => state.getAllOrdersAdmin);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrder());
    if (user?.role === "user") {
      navigate("/");
      toast("You are not allowed to access this page !!");
    }
  }, [user]);
  return (
    <div className="main-orders-page">
      <Sidebar />
      <div className="main-order-page-left">
        <div className="heading">
          <h1>Orders</h1>
          <div>
            <b>Total Orders : </b>
            {order?.orders?.length}
          </div>
          <div>
            <b>Total Revenue : </b>₹ {Math.round(order?.totalAmount)}
          </div>
        </div>

        <div className="orders-box">
          {order?.orders?.map((order, key) => (
            <OrderCard data={order} key={key} />
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Orders;
