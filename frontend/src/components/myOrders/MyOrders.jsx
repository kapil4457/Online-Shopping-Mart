import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cancelOrder, myOrders } from "../../redux/actions/orderAction";
import Loading from "../Loader/Loading";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import "./MyOrders.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import OrderItemCard from "./OrderItemCard";
const MyOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [itemToDisplay, setItemToDisplay] = useState(null);
  const [OrderitemToDisplay, setOrderItemToDisplay] = useState(null);
  const { loading, orders } = useSelector((state) => state.myOrder);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    dispatch(myOrders());
    if (OrderitemToDisplay != null && itemToDisplay != null) {
      setLoad(true);
    }
  }, [
    dispatch,
    navigate,
    OrderitemToDisplay,
    load,
    OrderitemToDisplay,
    itemToDisplay,
  ]);
  return (
    <>
      {loading === true ? (
        <Loading />
      ) : (
        <div className="my-orders-main">
          <h2>My Orders</h2>
          <div className="order-items">
            <div className="left-order-items">
              {orders?.map((item, key) => (
                <div key={key} className="order-card">
                  <div
                    onClick={async () => {
                      setItemToDisplay(item);
                      setOrderItemToDisplay(item?.orderItems);
                    }}
                  >
                    <div>
                      <b>Total : </b>
                      <span>₹ {item.itemsPrice}</span>
                    </div>
                    <div>
                      <b>Number of Items : </b>
                      <span>{item.orderItems.length}</span>
                    </div>
                    <div>
                      <b>Ordered on : </b>
                      <span>{item.createdAt.substring(0, 10)}</span>
                    </div>
                    <div>
                      <b>Order Status : </b>
                      <span
                        style={{
                          color:
                            item.orderStatus == "Cancelled" ? "red" : "green",
                          fontWeight: 650,
                        }}
                      >
                        {item.orderStatus}
                      </span>
                    </div>
                  </div>
                  {item.orderStatus === "Cancelled" ? (
                    <></>
                  ) : (
                    <button
                      onClick={() => {
                        dispatch(cancelOrder(item._id));
                        window.location.reload();
                      }}
                    >
                      <CancelOutlinedIcon />
                      Cancel
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="right-order-items">
              {itemToDisplay == null ? (
                <div className="right-side-info">
                  Click on an order to display it's details
                </div>
              ) : (
                <div className="item-info">
                  <div className="item-desc-card">
                    {load &&
                      OrderitemToDisplay?.map((item, key) => {
                        <OrderItemCard key={key} item={item} />;
                      })}

                    {/* <OrderItemCard item={itemToDisplay.orderItems[0]} /> */}
                  </div>

                  <div className="other-info">
                    <div>
                      <b>Order Status </b>
                      <span
                        style={{
                          color:
                            itemToDisplay.orderStatus === "Cancelled"
                              ? "red"
                              : "green",
                          fontWeight: 550,
                        }}
                      >
                        {itemToDisplay?.orderStatus}
                      </span>
                    </div>
                    <div>
                      <b>Total items </b>
                      <span>{itemToDisplay.orderItems.length}</span>
                    </div>
                    <div>
                      <b>Paid at </b>
                      <span>{itemToDisplay?.paidAt.substring(0, 10)}</span>
                    </div>
                    <div>
                      <b>SubTotal </b>
                      <span>₹ {itemToDisplay?.itemsPrice}</span>
                    </div>
                    <div>
                      <b>Tax </b>
                      <span>₹ {itemToDisplay?.taxPrice}</span>
                    </div>
                    <div>
                      <b>Shipping Charges : </b>
                      <span>₹ {itemToDisplay?.shippingPrice}</span>
                    </div>
                    <div>
                      <b>Total </b>
                      <span>₹ {itemToDisplay?.totalPrice}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyOrders;
