import React, { useState } from "react";
import i1 from "./bags.jpg";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

const CartCard = ({ item }) => {
  const [quan, setQuan] = useState(item.quantity);
  const [subTotal, setsubTotal] = useState(item.quantity * item.price);
  const updateLocalStorage = async () => {
    if (quan <= 0) {
      var temp = await JSON.parse(localStorage.getItem("cartItems"));
      const filtered = await temp.filter((i) => i.id !== item.id);
      localStorage.setItem("cartItems", JSON.stringify(filtered));
      // window.location.reload();

      return;
    } else {
      var temp = await JSON.parse(localStorage.getItem("cartItems"));
      await temp.forEach((i) => {
        if (item.id === i.id) {
          i.quantity = quan;
          return;
        }
      });
      setsubTotal(quan * item.price);
      localStorage.setItem("cartItems", JSON.stringify(temp));
    }
  };
  useEffect(() => {
    updateLocalStorage();
  }, [quan, item.quan, item.price]);
  return (
    <div className="cart-card">
      <img src={i1} alt="" />
      <div className="f">
        <div>
          <p>Name :</p>
          <NavLink to={`/products/item/${item.id}`} className="name-of-item">
            {item?.name}
          </NavLink>
        </div>
        <div>
          <p>Price :</p>
          <p className="price-of-item">₹ {item?.price}</p>
        </div>
        <div className="incrementer">
          <button
            className="dec"
            onClick={() => {
              var temp = quan - 1;
              setQuan(temp);
              updateLocalStorage();
            }}
          >
            <RemoveOutlinedIcon />
          </button>
          <div>{quan}</div>

          <button
            className="inc"
            onClick={() => {
              var temp = quan + 1;
              setQuan(temp);
              updateLocalStorage();
            }}
          >
            <AddOutlinedIcon />
          </button>
        </div>
      </div>
      <div className="subTotal">
        <b>Item Total : </b>
        <p>₹ {subTotal}</p>
      </div>
    </div>
  );
};

export default CartCard;
