import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { updateOrderStatus } from "../../redux/actions/orderAction";
import "./Order.css";

const OrderCard = ({ data }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const updateOrderStatusFunc = async (e) => {
    const statusNow = e.target.value;

    if (data?.orderStatus === statusNow) {
      toast(`Order Status is already : ${statusNow}`);
      return;
    }

    if (data?.orderStatus === "Delivered") {
      toast("Order has already been delivered");
      return;
    }
    const info = {
      status: statusNow,
      id: data?._id,
    };
    dispatch(updateOrderStatus(info));
  };
  return (
    <div className="order-card-main">
      <div className="left-order-card">
        <div>
          <b>Order Placed at </b> {data?.createdAt?.substr(0, 10)}
        </div>
        <div>
          <b>Number of Items </b> {data?.orderItems?.length}
        </div>
        <div>
          <b>Order Items </b>
          {data?.orderItems?.map((item, key) => (
            <NavLink to={`/products/item/${item?.product}`} key={key}>
              {item?.name}
            </NavLink>
          ))}
        </div>
        <div>
          <b>Subtotal </b> {data?.itemsPrice}
        </div>
        <div>
          <b>Delivery Charges </b> {data?.shippingPrice}
        </div>
        <div>
          <b>Tax : </b> {data?.taxPrice}
        </div>
        <div>
          <b>Total Price </b> {data?.totalPrice}
        </div>
        <div>
          <b>Contact Number </b> {data?.shippingInfo?.phoneNo}
        </div>
        <div>
          <b>Order Status </b>
          <span
            style={{
              color: data?.orderStatus !== "Cancelled" ? "green" : "red",
              fontWeight: 550,
            }}
          >
            {data?.orderStatus}
          </span>
        </div>
        <div>
          <b>Address </b> {data?.shippingInfo?.address},
          {data?.shippingInfo?.city},{data?.shippingInfo?.state},
          {data?.shippingInfo?.country},{data?.shippingInfo?.pinCode}
        </div>
      </div>
      <div className="right-order-card">
        <select
          name=""
          id=""
          disabled={
            data?.orderStatus === "Cancelled" || user.role === "user"
              ? true
              : false
          }
          onChange={updateOrderStatusFunc}
        >
          <option hidden>Update Order Status</option>
          <option value="Out for Delivery">Out for Delivery</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>
      <ToastContainer />
    </div>
  );
};

export default OrderCard;
