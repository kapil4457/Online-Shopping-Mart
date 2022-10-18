import React, { useState } from "react";
import "./Header.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
const sideBarHeadings = [
  {
    title: "Trending",
    subDiv: [
      {
        subTitle: "New Release",
        link: "/products/new",
      },
    ],
  },
  {
    title: "Shop By Category",
    subDiv: [
      {
        subTitle: "Mobiles",
        link: "/products/Mobile",
      },
      {
        subTitle: "Computers",
        link: "/products/Computers",
      },
      {
        subTitle: "Fashion",
        link: "/products/Fashion",
      },
      {
        subTitle: "Home",
        link: "/products/Home",
      },
      {
        subTitle: "Kitchen",
        link: "/products/Kitchen",
      },
      {
        subTitle: "Sports",
        link: "/products/Sports",
      },
      {
        subTitle: "Beauty",
        link: "/products/Beauty",
      },
      {
        subTitle: "Toys",
        link: "/products/Toys",
      },
      {
        subTitle: "Books",
        link: "/products/Books",
      },
    ],
  },
  {
    title: "Help & Settings",
    subDiv: [
      {
        subTitle: "Your Account",
        link: "/account",
      },
      {
        subTitle: "Customer Services",
        link: "/services",
      },
      {
        subTitle: "Sign in",
        link: "/login",
      },
    ],
  },
];
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

  const appearSideHeader = () => {
    var temp = document.getElementsByClassName("side-header")[0];
    temp.classList.add("translateXPositive");
    temp.classList.remove("translateXNegative");
  };

  const DisappearSideHeader = () => {
    var temp = document.getElementById("side-header");
    // console.log(temp);
    temp.classList.add("translateXNegative");
    temp.classList.remove("translateXPositive");
  };

  return (
    <>
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
                <div>
                  <SearchOutlinedIcon
                    onClick={sendRequest}
                    style={{ cursor: "pointer" }}
                  />
                </div>
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
          <div
            className="all"
            onClick={appearSideHeader}
            style={{ cursor: "pointer" }}
          >
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

      <div className="side-header" id="side-header">
        <div className="cross" onClick={DisappearSideHeader}>
          <CloseIcon />
        </div>
        <div className="main-side-header">
          <div className="account">
            <p>Hello Kapil</p>
          </div>
          <div className="options">
            {sideBarHeadings.map((item) => (
              <div>
                <h2 className="item-header">{item.title}</h2>
                {item.subDiv.map((sub) => (
                  <NavLink to={`${sub.link}`} className="item-sub-header">
                    {sub.subTitle}
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
