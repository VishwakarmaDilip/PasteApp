import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { clearTime, logout } from "../redux/authSlice";
import toast from "react-hot-toast";

const UserActionBox = () => {
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/users/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (response.status < 299) {
        dispatch(logout());
        toast.success("Logout Successfully")
        dispatch(clearTime())
        navigate("/")
      }
    } catch (error) {
      console.log("Log Out:", error);
    }
  };

  return (
    <div className=" absolute h-20 w-20 hidden group-hover:flex flex-col items-center justify-center bg-white border right-2 rounded-md overflow-hidden">
      {loggedIn ? (
        <>
          <button
            onClick={handleLogout}
            className="hover:bg-blue-700 hover:text-white grid place-content-center w-full h-1/2"
          >
            Log Out
          </button>
        </>
      ) : (
        <>
          <NavLink
            to={"/login"}
            className="hover:bg-blue-700 hover:text-white grid place-content-center w-full h-1/2"
          >
            Log In
          </NavLink>
          <NavLink
            to={"/signUp"}
            className="hover:bg-blue-700 hover:text-white grid place-content-center w-full h-1/2"
          >
            Sign Up
          </NavLink>
        </>
      )}
    </div>
  );
};

export default UserActionBox;
