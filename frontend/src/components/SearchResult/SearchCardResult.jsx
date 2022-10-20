import React, { useState } from "react";
import "./SearchCardResult.css";
import itemImage from "./television.jpg";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
const SearchCardResult = ({ data }) => {
  const [dis, setDis] = useState("block");

  const setD = () => {
    if (data.dealOfTheDay == true) {
      setDis("block");
    } else {
      setDis("none");
    }
  };

  useEffect(() => {
    setD();
  }, []);
  return (
    <>
      <div className="main-search-card">
        <div className="dealOfTheDay" style={{ display: `${dis} ` }}>
          <h2>Deal of The Day</h2>
        </div>
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
