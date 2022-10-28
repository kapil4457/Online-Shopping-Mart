import React, { useState } from "react";
import "./UpdatePassword.css";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../redux/actions/userAction";
import { useEffect } from "react";
import { useNavigate } from "react-router";
const UpdatePassword = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [ConfirmnewPassword, setConfirmNewPassword] = useState("");
  const dispatch = useDispatch();
  const { isUpdated } = useSelector((state) => state.profile);
  const updatePasswordFunc = async () => {
    if (!oldPassword || !newPassword || !ConfirmnewPassword) {
      toast("Please fill in all the fields");
      return;
    }
    const data = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: ConfirmnewPassword,
    };

    dispatch(updatePassword(data));
  };

  useEffect(() => {
    if (isUpdated == true) {
      toast("Password Updated Successfully");
      setTimeout(() => {
        navigate("/account");
        window.location.reload();
      }, 3000);
    }
  }, [isUpdated]);
  return (
    <div className="main-update-password">
      <div className="card-update">
        <h2>Update Password</h2>
        <input
          type="text"
          placeholder="Type your old password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type your new Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Confirm new Password"
          value={ConfirmnewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
        <button onClick={updatePasswordFunc}>Update</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdatePassword;
