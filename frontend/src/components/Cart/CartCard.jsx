import React, { useState } from "react";
import i1 from "./bags.jpg";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

const CartCard = ({ item }) => {
  const [quan, setQuan] = useState(item.quantity);

  const updateLocalStorage = async () => {
    var temp = await JSON.parse(localStorage.getItem("cartItems"));
    await temp.forEach((i) => {
      if (item.id === i.id) {
        i.quantity = quan;
        return;
      }
    });
    localStorage.setItem("cartItems", JSON.stringify(temp));
  };
  useEffect(() => {
    updateLocalStorage();
  }, [quan]);
  return (
    <div className="cart-card">
      <img src={i1} alt="" />
      <div>
        <div>
          <p>Name :</p>
          <NavLink to={`/products/item/${item.id}`} className="name-of-item">
            {item?.name}
          </NavLink>
        </div>
        <div>
          <p>Price :</p>
          <p className="price-of-item">{item?.price}</p>
        </div>
        <div>
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
      <button className="remove"></button>
    </div>
  );
};

export default CartCard;
