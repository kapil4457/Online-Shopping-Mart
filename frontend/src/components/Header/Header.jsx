import React from "react";
import "./Header.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="main-header">
      <div className="first-part">
        <NavLink to="/" className="left">
          <img src="main-logo.png" alt="" />
        </NavLink>

        <div className="right">
          <div className="main-bar">
            <div className="search-bar">
              <input type="text" placeholder="Search Items" />
              <SearchOutlinedIcon />
            </div>
          </div>

          <NavLink to="/my-orders" className="my-orders">
            <GavelOutlinedIcon />
            <p>My Orders</p>
          </NavLink>
          <NavLink to="/cart" className="cart">
            <ShoppingCartOutlinedIcon />
            <p>Cart</p>
          </NavLink>
          <NavLink to="/account" className="accountSection">
            <img src="logo.png" alt="" />
          </NavLink>
        </div>
      </div>
      <div className="second-part">
        <div className="all"></div>
        <div className="other-options"></div>
      </div>
    </div>
  );
};

export default Header;
