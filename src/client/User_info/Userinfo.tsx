import { useLocation, useNavigate } from "react-router-dom";
import "./Userinfo.css";
import Navbar from "../Navbar/Navbar";
import Login from "../Login/Login";
import React, { useState, useEffect } from "react";
import LoginNavbar from "../components/LoginNavBar";
type Cats = {
  age: number;
  breed: string;
  description: string;
  gender: string;
  id: number;
  img_url: string;
  is_available: boolean;
  name: string;
  seller_email: string;
  seller_id: number;
  seller_name: string;
};

function UserInfo() {
  let email: string;
  let password: string;
  let user_id: number;
  let name: string;
  let username: string;

  const nav = useNavigate();

  const [cats, setCats] = useState<Cats[]>([]);

  const { state } = useLocation();
  if (state) {
    email = state.email;
    password = state.password;
    user_id = state.user_id;
    name = state.name;
    username = state.username;
  }

  useEffect(() => {
    fetch("http://127.0.0.1:5000/all_cats", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        if (data.code === 400) {
          alert("Not cat found");
        } else {
          console.log(data.body);
          const catData = data.body.map((cat: any) => ({
            age: cat.age,
            breed: cat.breed,
            description: cat.description,
            gender: cat.gender,
            id: cat.id,
            img_url: cat.img_url,
            is_available: cat.is_available,
            name: cat.name,
            seller_email: cat.seller_email,
            seller_id: cat.seller_id,
            seller_name: cat.seller_name,
          }));
          setCats(catData);
        }
      })
      .catch((error) => {
        console.log("error");
      });
  }, []);

  const filterCats = cats.filter((cat) => cat.seller_id === user_id);

  const handleSubmit = () => {
    nav("/donate", { state: { email, password, user_id, name, username } });
  };

  const logout = (e: any) => {
    e.preventDefault();

    return fetch("http://127.0.0.1:5000/logout")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        nav("/login");
      });
  };

  const deleteCat = () => {};
  return state === null ? (
    <>
      {alert("This page can not be accessed without sign in")}
      <Login />
    </>
  ) : (
    <>
      <LoginNavbar />
      <div className="mx-[5%] w-[90%]">
        <div className="  mt-10 small-heading">Welcome, {state.name}</div>
        <div className="  small-heading">Email: {state.email}</div>
      </div>
      <h6 className="mt-20 mb-5 mx-[5%] small-title">My Cats</h6>
      <div className="upload-btn-container mx-[5%] ">
        <button
          onClick={handleSubmit}
          className="px-20 py-3 border round-md mb-5 hover:bg-red-400 hover:text-white"
        >
          Upload <i className="fa-sharp fa-solid fa-plus"></i>
        </button>
      </div>
      <div className=" w-[90%] grid md:grid-cols-3 grid-cols-2 gap-4 mx-[5%]">
        {filterCats.map((cat) => (
          <div key={cat.id} className="shadow-md bg-white p-4 rounded-lg">
            <div className="delete-icon-container">
              <i className="fa-solid fa-xmark text-gray-300 hover:text-red-500 cursor-pointer text-[30px] mb-3"></i>
            </div>
            <img className="rounded-sm" src={cat.img_url} alt={cat.img_url} />
            <div className="cat-info">
              <p>
                <article>
                  <strong>Name : </strong>
                  {cat.name}
                </article>
                <article>
                  <strong>Age : </strong>
                  {cat.age}
                </article>
                <article>
                  <strong>Breed : </strong>
                  {cat.breed}
                </article>
                <article>
                  <strong>Gender : </strong>
                  {cat.gender}
                </article>
                <article>
                  <strong>Is it available? : </strong>
                  {cat.is_available ? <>Yes</> : <>No</>}
                </article>
                <article>
                  <strong>Description : </strong>
                  <>{cat.description}</>
                </article>
                <div className=""></div>
              </p>
            </div>
          </div>
        ))}
      </div>

      <button type="button" className="button-20" onClick={logout}>
        Log Out
      </button>
    </>
  );
}

export default UserInfo;
