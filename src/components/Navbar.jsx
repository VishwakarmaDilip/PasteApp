import React from "react";
import { NavLink } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import UserActionBox from "./UserActionBox";

const Navbar = () => {
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
          to={"/pastes"}
          className={({ isActive }) =>
            isActive ? "text-blue-700 font-bold" : " font-semibold"
          }
        >
          Pastes
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
