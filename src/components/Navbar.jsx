import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import UserActionBox from "./UserActionBox";
import { useSelector } from "react-redux";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const menuRef = useRef();

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsAnimatingOut(true);
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsAnimatingOut(false);
      }, 200); // must match animation duration
    } else {
      setIsMenuOpen(true);
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-between items-center border-b p-3">
      <div className="flex gap-10">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive ? "text-blue-700 font-bold" : "font-semibold"
          }
        >
          Home
        </NavLink>
        <NavLink
          to={"/userNotes"}
          className={({ isActive }) =>
            isLoggedIn
              ? isActive
                ? "text-blue-700 font-bold"
                : "font-semibold"
              : "hidden"
          }
        >
          Notes
        </NavLink>
        <NavLink
          to={"/pastes"}
          className={({ isActive }) =>
            isActive ? "text-blue-700 font-bold" : "font-semibold"
          }
        >
          {isLoggedIn ? "Device Notes" : "Notes"}
        </NavLink>
      </div>

      <div className="pr-2">
        {!isLoggedIn ? (
          <ul className="flex gap-2 items-center">
            <li>
              <NavLink
                to={"/login"}
                className="font-semibold hover:bg-blue-700 hover:text-white p-1 px-2 rounded-lg"
              >
                Log In
              </NavLink>
            </li>
            <li>
              <span className="font-semibold">/</span>
            </li>
            <li>
              <NavLink
                to={"/signup"}
                className="font-semibold hover:bg-blue-700 hover:text-white p-1 px-2 rounded-lg"
              >
                Sign Up
              </NavLink>
            </li>
          </ul>
        ) : (
          <div className="relative" ref={menuRef}>
            <button onClick={toggleMenu}>
              <FeatherIcon icon="user" className="w-5 h-5" />
            </button>
            {(isMenuOpen || isAnimatingOut) && (
              <div
                className={`absolute right-0 top-full mt-2 ${
                  isMenuOpen
                    ? "animate-fade-in-scale"
                    : "animate-fade-out-scale"
                }`}
              >
                <UserActionBox onClose={toggleMenu}
                  userName="Dilip Vishwakarma"
                  // refrence={target}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
