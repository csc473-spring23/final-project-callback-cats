import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./Navbar.css";
function Navbar() {
  const [isToggle, setToggle] = useState(false);

  function handleLinkClick() {
    setToggle(!isToggle);
    const menuItemsEl = document.getElementById("menu-items");
    if (menuItemsEl) {
      menuItemsEl.style.top = "-580%";
    }
  }

  return (
    <>
      <div className="navheader">
        <nav className="flex justify-between items-center w-[92%] mx-auto ">
          <span className="text-2xl  cursor-pointer nav-brand shadow-md rounded-lg p-2  hover:bg-black text-teal-600 hover:text-white">
            <span className="text-red-500">callback</span>
            <span className="">Cats</span>
          </span>
          <div
            id="menu-items"
            className="md:static absolute  bg-white opacity-90 rounded-lg p-2 md:min-h-fit min-h-[60vh] left-0 top-[-580%] duration-300 ease-in-out md:w-auto w-full items-center px-5 "
          >
            <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-6">
              <Link onClick={handleLinkClick} to={"/"}>
                {" "}
                <span className="md:hover:text-red-400 hover:text-white nav-item">
                  Home
                </span>{" "}
              </Link>
              <Link onClick={handleLinkClick} to={"/adopt"}>
                {" "}
                <span className="md:hover:text-red-400 hover:text-white nav-item">
                  Adopt
                </span>{" "}
              </Link>
              <Link onClick={handleLinkClick} to={"/catfacts"}>
                {" "}
                <span className="md:hover:text-red-400 hover:text-white nav-item">
                  Facts
                </span>{" "}
              </Link>
              <Link onClick={handleLinkClick} to={"/register"}>
                {" "}
                <span className="md:hover:text-red-400 hover:text-white nav-item">
                  Register
                </span>{" "}
              </Link>
            </ul>
          </div>

          <div className="flex items-center gap-6">
            <button
              id="c-button"
              className="bg-red-400 text-white px-5 py-2 rounded-full hover:bg-red-500"
            >
              <a href={"/login"}>Sign In</a>
            </button>
            {!isToggle ? (
              <i
                id="close-icon"
                onClick={() => {
                  setToggle(!isToggle);
                  const menus = document.getElementById("menu-items");
                  if (menus) {
                    menus.style.top = "50px";
                  }
                }}
                className="fa-solid fa-bars text-3xl cursor-pointer md:hidden"
              ></i>
            ) : (
              <i
                id="menu-icon"
                onClick={() => {
                  setToggle(!isToggle);
                  const menus = document.getElementById("menu-items");
                  if (menus) {
                    menus.style.top = "-580%";
                  }
                }}
                className=" fa-solid fa-xmark text-3xl cursor-pointer md:hidden"
              ></i>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
