import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import userAuth from "../Custom_hook/UserAuth";

import "./Navbar.css";
function LoginNavbar() {
  let set_Auth: any;

  set_Auth = userAuth();
  const { setAuth } = set_Auth;

  const nav = useNavigate();
  const [isToggle, setToggle] = useState(false);

  const logout = (e: any) => {
    e.preventDefault();

    return fetch("http://127.0.0.1:5000/logout")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAuth({});
        nav("/login");
      });
  };

  return (
    <>
      <nav className="flex justify-between items-center w-[92%] mx-auto ">
        <span className="text-2xl font-[Merriweather]  cursor-pointer nav-brand shadow-md rounded-lg p-2   text-red-400 ">
          <Link to={"/"}>
            <span className="text-[#394867] tracking-tighter">Callback</span>
            <span className="">
              <i className="fa-solid fa-cat"></i>
            </span>
          </Link>
        </span>
        <div
          id="menu-items"
          className="md:static absolute  opacity-90  md:min-h-fit min-h-[60vh] left-0 top-[-580%] duration-300 ease-in-out md:w-auto w-full items-center px-5 "
        >
          <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-6">
            <Link to={"/"}>
              {" "}
              <span className="md:hover:text-red-400 hover:text-white nav-item">
                Home
              </span>{" "}
            </Link>
            <Link to={"/userinfo"}>
              {" "}
              <span className="md:hover:text-red-400 hover:text-white nav-item">
                User Info
              </span>{" "}
            </Link>
            <Link to={"/message"}>
              {" "}
              <span className="md:hover:text-red-400 hover:text-white nav-item">
                Message
              </span>{" "}
            </Link>
            <Link to={"/adopt"}>
              {" "}
              <span className="md:hover:text-red-400 hover:text-white nav-item">
                Adopt
              </span>{" "}
            </Link>
            <Link to={"/catfacts"}>
              {" "}
              <span className="md:hover:text-red-400 hover:text-white nav-item">
                Facts
              </span>{" "}
            </Link>
          </ul>
        </div>

        <div className="flex items-center gap-6">
          <button
            id="c-button"
            onClick={logout}
            className="border border-gray-400  text-black px-5 py-2  hover:bg-red-400 hover:border-red-400 hover:text-white rounded-full"
          >
            Log Out
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
    </>
  );
}

export default LoginNavbar;
