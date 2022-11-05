import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateUserRole } from "../../redux/actions/userAction";

const UserCard = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const deleteUser = async () => {
    try {
      await axios.delete(`/api/v1/admin/delete/user/${data?._id}`);
      toast("User Delete Successfully !!");

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 3000);
    } catch (error) {
      toast(error.message);
    }
  };

  const updateUserRoleFunc = async (e) => {
    const newRole = e.target.value;

    const info = {
      id: data._id,
      role: newRole,
    };
    dispatch(updateUserRole(info));
    toast("Please Wait...");
    setTimeout(() => {
      navigate("/admin/dashboard");
      toast("User Role updated successfully");
    }, 3000);
  };
  return (
    <div className="user-card-main">
      <img src={data?.avatar?.url} alt="" />
      <div className="info">
        <div>
          <b>Name </b>
          {data?.name}
        </div>
        <div>
          <b>Email </b>
          {data?.email}
        </div>
        <div>
          <b>Role </b>
          {data?.role}
        </div>
        <div>
          <b>Joined </b>
          {data?.createdAt?.substring(0, 10)}
        </div>
      </div>
      <div className="user-card-buttons">
        <button
          onClick={deleteUser}
          disabled={user?.role === "admin" ? false : true}
        >
          Delete
        </button>
        <select
          name=""
          id=""
          onChange={updateUserRoleFunc}
          disabled={user?.role === "admin" ? false : true}
        >
          <option hidden>Update User Role</option>
          <option value="admin">admin</option>
          <option value="user">user</option>
        </select>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserCard;
