import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { updateProfile } from "../../redux/actions/userAction";
import Loading from "../Loader/Loading";
import "./updateProfile.css";
const UpdateProfile = () => {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const { isUpdated } = useSelector((state) => state.profile);

  const [newName, setName] = useState();
  const [newEmail, setEmail] = useState();
  const dispatch = useDispatch();
  const updateData = async () => {
    if (!newName || !newEmail) {
      toast("Please Enter both the fields");
    } else {
      const data = {
        name: newName,
        email: newEmail,
      };
      dispatch(updateProfile(data));
    }
  };
  useEffect(() => {
    window.onload = () => {
      navigate("/account");
      window.location.reload();
    };

    if (isUpdated == true) {
      toast("Data updated successfully");
      setTimeout(() => {
        navigate("/account");
        window.location.reload();
      }, 3000);
    }

    setName(user.name);
    setEmail(user.email);
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, user, navigate, isUpdated]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="update-profile-main">
          <div className="update-profile-card">
            <h2>Update Profile</h2>
            <div>
              <label htmlFor="">Name : </label>
              <input
                type="text"
                value={newName}
                id="name-box"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <input
                type="checkbox"
                onClick={() => {
                  var temp = document.getElementById("name-box");
                  temp.disabled = !temp.disabled;
                }}
              />
            </div>
            <div>
              <label htmlFor="">Email :</label>
              <input
                type="text"
                value={newEmail}
                id="email-box"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                type="checkbox"
                onClick={() => {
                  var temp = document.getElementById("email-box");
                  temp.disabled = !temp.disabled;
                }}
              />
            </div>
            <button onClick={updateData}>Update</button>
            <div className="last-redirect">
              <p>Update Password - </p>
              <NavLink to="/update/password">Click Here</NavLink>
            </div>
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default UpdateProfile;
