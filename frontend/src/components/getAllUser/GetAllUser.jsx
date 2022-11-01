import React, { useEffect } from "react";
import Sidebar from "../SideBar/Sidebar";
import "./GetAllUser.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser, loadUser } from "../../redux/actions/userAction";
import Loading from "../Loader/Loading";
import UserCard from "./UserCard";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
const GetAllUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, user } = useSelector((state) => state.user);
  useEffect(() => {
    // dispatch(loadUser());
    dispatch(getAllUser());
    if (user?.role === "user") {
      navigate("/");
      toast("You are not allowed to access this page !!");
    }
  }, [user?.role]);

  return (
    <div className="all-users-main">
      <Sidebar />
      {loading ? (
        <Loading />
      ) : (
        <div className="all-users-div">
          <div className="heading">
            <h1>Users </h1>
            <div>
              <b>Total Users : </b>
              {users?.userCount}
            </div>
          </div>
          <div className="user-box">
            {users?.users?.map((user, key) => (
              <UserCard data={user} key={key} />
            ))}
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default GetAllUser;
