import React, { useState } from "react";
import "./Header.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
const Header = () => {
  const navigate = useNavigate();

  const [searchItem, setSearchItem] = useState("");

  const sendRequest = () => {
    if (searchItem === "") {
      window.alert("Please Enter Something to Search");
      return;
    } else {
      navigate(`/products/${searchItem}`);
    }
  };

  return (
    <div className="main-header">
      <div className="first-part">
        <NavLink to="/" className="left">
          <img src="logo2.png" alt="" />
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
        <div className="all">
          <MenuIcon />
          <p>All</p>
        </div>
        <div className="other-options">
          <NavLink to="/products/Mobiles">Mobile</NavLink>
          <NavLink to="/products/Kids">Kids</NavLink>
          <NavLink to="/products/Sports">Sports</NavLink>
          <NavLink to="/products/Kitchen">Kitchen</NavLink>
          <NavLink to="/products/Fashion">Fashion</NavLink>
          <NavLink to="/products/Books">Books</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
