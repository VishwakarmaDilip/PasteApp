import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import toast from "react-hot-toast";
import FeatherIcon from "feather-icons-react";
import React, { useEffect } from "react";

const UserActionBox = ({ onClose, userName }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `https://paste-app-backend-production.up.railway.app/api/v1/users/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (response.status < 299) {
        dispatch(logout());
        toast.success("Logout Successfully");
        navigate("/");
      }
    } catch (error) {
      console.log("Log Out:", error);
    }
  };

  return (
    <div className="top-0 right-0 absolute h-fit w-56 bg-white border border-black flex flex-col z-50 shadow-md rounded-md">
      <div className="flex justify-between items-center mb-2 px-3 pt-2">
        <h2 className="font-semibold text-base cursor-default">
          Hi, {userName}
        </h2>
        <button onClick={onClose}>
          <FeatherIcon icon="x" className="h-4 w-4 hover:bg-gray-200 rounded" />
        </button>
      </div>
      <hr />
      <ul className="flex flex-col p-2">
        <NavLink
          to={"/userProfile"}
          onClick={onClose}
          className="flex items-center gap-2 rounded-md p-2 hover:bg-gray-200"
        >
          <FeatherIcon icon="user" className="h-5" />
          <span>Your Profile</span>
        </NavLink>
        <NavLink
          to={"/changePassword"}
          onClick={onClose}
          className="flex items-center gap-2 rounded-md p-2 hover:bg-gray-200"
        >
          <FeatherIcon icon="key" className="h-5" />
          <span>Change Password</span>
        </NavLink>
        <hr className="my-2" />
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-start w-full px-2 py-1 hover:bg-gray-200 rounded-md"
        >
          <FeatherIcon icon="log-out" className="h-5" />
          <span>Log Out</span>
        </button>
      </ul>
    </div>
  );
};

export default UserActionBox;
