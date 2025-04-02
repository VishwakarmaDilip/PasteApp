import React from "react";
import { NavLink } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import UserActionBox from "./UserActionBox";
import { useSelector } from "react-redux";

const Navbar = () => {
  const isloggedIn = useSelector((state) => state.auth.isLoggedIn)

  return (
    <div className=" flex justify-between border-b">
      <div className="w-full flex gap-10 p-3">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive ? "text-blue-700 font-bold" : " font-semibold"
          }
        >
          Home
        </NavLink>
        <NavLink
          to={"/userNotes"}
          className={({ isActive }) =>
            isActive ? `text-blue-700 font-bold ${!isloggedIn?"hidden":"block"} ` : `font-semibold ${!isloggedIn?"hidden":"block"}`
          }
        >
          Notes
        </NavLink>
        <NavLink
          to={"/pastes"}
          className={({ isActive }) =>
            isActive ? "text-blue-700 font-bold" : " font-semibold"
          }
        >
          {isloggedIn ? "Device Notes": "Notes"}
        </NavLink>
      </div>
      <div className=" cursor-pointer relative group">
        <FeatherIcon
        icon="user"
        className=" h-10 mr-8"/>
        <UserActionBox/>
      </div>
    </div>
  );
};

export default Navbar;
