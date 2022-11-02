import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Loading from "../Loader/Loading";
import { ToastContainer, toast } from "react-toastify";

import "./Account.css";

const Account = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (error) {
      toast(error);
    }
    if (isAuthenticated === false || user == null) {
      navigate("/login");
    }
  }, [isAuthenticated, error, navigate, user]);

  return (
    <>
      {loading === true ? (
        <Loading />
      ) : (
        <>
          <div className="account-main">
            <div className="left-account-page">
              <img src={user?.avatar?.url} alt="" />
            </div>
            <div className="right-account-page">
              <div>
                <b>Name : </b>
                <p>{user?.name}</p>
              </div>
              <div>
                <b>Email : </b>
                <p>{user?.email}</p>
              </div>
              <div>
                <b>Joined on : </b>
                <p>{user?.createdAt?.substring(0, 10)}</p>
              </div>
              <button
                onClick={() => {
                  navigate("/update/profile");
                }}
              >
                Update Profile
              </button>
            </div>
          </div>
          <ToastContainer />
        </>
      )}
    </>
  );
};

export default Account;
