import React, { useState } from "react";
import "./Header.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const [color, setColor] = useState(
    "linear-gradient(to bottom , rgba(44, 44, 44, 0.5), rgba(44,44,44,0)  )"
  );

  const navigate = useNavigate();

  const [searchItem, setSearchItem] = useState("");

  const scrollNavBar = () => {
    if (document.documentElement.scrollTop > 100) {
      setColor("rgba(0,0,0,0.6");
    } else {
      setColor(
        "linear-gradient(to bottom , rgba(44, 44, 44, 0.5), rgba(44,44,44,0)  )"
      );
    }
  };
  window.onscroll = () => {
    scrollNavBar();
  };

  const sendRequest = () => {
    if (searchItem === "") {
      window.alert("Please Enter Something to Search");
      return;
    } else {
      navigate(`/products/${searchItem}`);
    }
  };

  return (
    <div
      className="main-header"
      style={{
        background: `${color}`,
      }}
    >
      <div className="first-part">
        <NavLink to="/" className="left">
          <img src="main-logo.png" alt="" />
        </NavLink>

        <div className="right">
          <div className="main-bar">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search Items"
                value={`${searchItem}`}
                onChange={(e) => setSearchItem(e.target.value)}
              />
              <SearchOutlinedIcon
                onClick={sendRequest}
                style={{ cursor: "pointer" }}
              />
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
