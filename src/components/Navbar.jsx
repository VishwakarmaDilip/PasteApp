import { isAction } from "@reduxjs/toolkit";
import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full flex gap-10 p-3 border-b">
      <NavLink
        to={"/"}
        className={({isActive}) => (isActive ? "text-blue-700 font-bold" : " font-semibold")}
      >
        Home
      </NavLink>
      <NavLink
        to={"/pastes"}
        className={({isActive}) => (isActive ? "text-blue-700 font-bold" : " font-semibold")}
      >
        Pastes
      </NavLink>
    </div>
  );
};

export default Navbar;
