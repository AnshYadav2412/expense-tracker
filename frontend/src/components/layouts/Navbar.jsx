import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  return (
    <div className="flex gap-5 bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30 items-center">
      <button
        className="block lg:hidden text-black"
        onClick={() => {
          setOpenSideMenu(!openSideMenu);
        }}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>
      <div className="">
        <svg
          width="40"
          height="40"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="bg_grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#875cf5" />
              <stop offset="100%" stop-color="#6236cc" />
            </linearGradient>
          </defs>
          <rect width="100" height="100" rx="24" fill="url(#bg_grad)" />
          <rect
            x="20"
            y="35"
            width="60"
            height="40"
            rx="8"
            fill="white"
            fill-opacity="0.15"
          />
          <rect
            x="20"
            y="35"
            width="60"
            height="40"
            rx="8"
            stroke="white"
            stroke-opacity="0.3"
            stroke-width="1"
          />
          <path
            d="M30 25H60C62.2091 25 64 26.7909 64 29V35H26V29C26 26.7909 27.7909 25 30 25Z"
            fill="#FFD700"
          />
          <rect x="70" y="47" width="14" height="16" rx="4" fill="white" />
          <circle cx="77" cy="55" r="3" fill="#875cf5" />
          <rect x="28" y="60" width="6" height="8" rx="1" fill="#FF7E7E" />{" "}
          <rect x="38" y="52" width="6" height="16" rx="1" fill="#4ADE80" />{" "}
          <rect x="48" y="56" width="6" height="12" rx="1" fill="#60A5FA" />{" "}
          <circle cx="78" cy="22" r="5" fill="#FBBF24" />
          <path
            d="M78 19V25M76 20H80"
            stroke="#B45309"
            stroke-width="1"
            stroke-linecap="round"
          />
        </svg>
      </div>

      <h2 className="text-lg font-medium text-black ">Expense Tracker</h2>

      {openSideMenu && (
        <div className="fixed top-15.25 -ml-4 bg-white">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
