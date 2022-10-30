import { Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../redux/actions/orderAction";
import "./ConfirmOrder.css";

const ConfirmOrder = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { order } = useSelector((state) => state.createOrder);
  const navigate = useNavigate();

  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  const shippingInfo = JSON.parse(localStorage.getItem("ShippingInfo"));

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = Math.round(subtotal * 0.18);
  const totalPrice = subtotal + shippingCharges + tax;
  const address = `${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.pinCode},${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      itemsPrice: subtotal,
      taxPrice: tax,
      shippingPrice: shippingCharges,
      shippingInfo: shippingInfo,
      orderItems: cartItems,
      paymentInfo: {
        method: "COD",
        status: "Processing",
      },
      totalPrice: totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    dispatch(createOrder(data));
  };

  if (!isAuthenticated) {
    navigate("/account");
  }

  useEffect(() => {
    if (order) {
      if (order.success === true) {
        navigate("/order/placed");
        window.location.reload();
      }
    }
  }, [order]);
  return (
    <>
      <div className="ConfirmOrderPage">
        <div>
          <div className="ConfirmShippingArea">
            <Typography>Shipping Info</Typography>
            <div className="ConfirmShippingAreaBox">
              <div>
                <p>Name : </p>
                <span>{user?.name}</span>
              </div>
              <div>
                <p>Phone Number : </p>
                <span> {shippingInfo?.phoneNo}</span>
              </div>
              <div>
                <p>Address : </p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="ConfirmCartItems">
            <Typography>Your Cart Items : </Typography>
            <div className="ConfirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <NavLink to={`/product/${item.product}`}>
                      {item.name}
                    </NavLink>
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.quantity * item.price}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="OrderSummary">
            <Typography className="title">Order Summary</Typography>
            <div className="main">
              <div>
                <p>Subtotal :</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges :</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST :</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="OrderSummaryTotal">
              <p>
                <b>Total :</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>
            <div className="btn">
              <button onClick={proceedToPayment}>Confirm Order</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
