import React from "react";
import "./SearchCardResult.css";
import itemImage from "./television.jpg";
import { NavLink } from "react-router-dom";
const SearchCardResult = ({ data }) => {
  return (
    <>
      <div className="main-search-card">
        <img src={`${itemImage}`} alt="" />

        <div className="item-name">
          <p className="head">Item Name </p>
          <p>{data.name}</p>
        </div>
        <div className="item-price">
          <p>Price </p>
          <p>₹ {data.price}</p>
        </div>

        <NavLink to={`/products/item/${data._id}`}>Details</NavLink>
      </div>
    </>
  );
};

export default SearchCardResult;
