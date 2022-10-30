import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PaidIcon from "@mui/icons-material/Paid";
import Inventory2Icon from "@mui/icons-material/Inventory2";
const Dashboard = () => {
  return (
    <div className="sidebar">
      <NavLink to="/admin/dashboard">
        <DashboardIcon />
        <span>DashBoard</span>
      </NavLink>
      <NavLink to="/admin/products">
        <Inventory2Icon />
        <span>Products</span>
      </NavLink>
      <NavLink to="/admin/orders">
        <PaidIcon />
        <span>Orders</span>
      </NavLink>
      <NavLink to="/admin/users">
        <PeopleIcon />
        <span>Users</span>
      </NavLink>
    </div>
  );
};

export default Dashboard;
