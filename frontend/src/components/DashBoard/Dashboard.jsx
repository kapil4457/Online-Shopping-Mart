import React, { useEffect } from "react";
import "./Dashboard.css";
import Sidebar from "../SideBar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../../redux/actions/orderAction";
import Loading from "../Loader/Loading";
import { getAllProducts } from "../../redux/actions/productAction";
import { getAllUser } from "../../redux/actions/userAction";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.getAllOrdersAdmin);
  const { products, loading } = useSelector((state) => state.getAllProducts);
  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllOrder());
    dispatch(getAllProducts());
    dispatch(getAllUser());
  }, []);
  return (
    <>
      {order?.loading === true || loading === true ? (
        <Loading />
      ) : (
        <div className="main-dash-board">
          <Sidebar />
          <div className="dashboard">
            <div className="totalEarn">
              Total Revenue :₹ {Math.round(order?.totalAmount)}
            </div>
            <div className="overview-circle">
              <div className="orderCount">
                <b>Total Orders </b>
                <span>{order?.orders?.length}</span>
              </div>
              <div className="userCount">
                <b>Total Users </b>
                <span>{users?.userCount}</span>
              </div>
              <div className="productCount">
                <b>Total Products </b>
                <span>{products?.productCount}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;