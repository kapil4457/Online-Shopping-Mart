import React, { useEffect, useState } from "react";
import "./Header.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "./logo2.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/userAction";
import tempPP from "./tempPP.png";

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchItem, setSearchItem] = useState("");
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
          subTitle: user ? " " : "Sign In",
          link: "/login",
        },
      ],
    },
  ];

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

  const logoutTrigger = async () => {
    dispatch(logout());
  };

  return (
    <>
      <div className="main-header">
        <div className="first-part">
          <NavLink to="/" className="left">
            <img src={`${logo}`} alt="" />
          </NavLink>

          <div className="right">
            <div className="main-bar">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search Items"
                  value={`${searchItem}`}
                  id="myInput"
                  onChange={(e) => setSearchItem(e.target.value)}
                />
                <div>
                  <SearchOutlinedIcon
                    onClick={sendRequest}
                    style={{ cursor: "pointer" }}
                    id="myBtn"
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
            <NavLink
              to={user ? "/account" : "/login"}
              className="accountSection"
            >
              {user != null ? (
                <img
                  src={user?.avatar?.url}
                  alt=""
                  style={{ border: "2px solid white" }}
                />
              ) : (
                <img
                  src={tempPP}
                  alt=""
                  style={{ border: "2px solid white" }}
                />
              )}
            </NavLink>
            {user ? (
              <LogoutIcon
                className="logout-icon"
                style={{ fontSize: "2rem" }}
                onClick={logoutTrigger}
              />
            ) : (
              <></>
            )}
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
            <p>Hello {user?.name ? user?.name : "Guest"}</p>
          </div>
          <div className="options">
            {sideBarHeadings.map((item, key) => (
              <div key={key}>
                <h2 className="item-header">{item.title}</h2>
                {item.subDiv.map((sub, key) => (
                  <NavLink
                    key={key}
                    to={`${sub.link}`}
                    className="item-sub-header"
                    onClick={DisappearSideHeader}
                  >
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
