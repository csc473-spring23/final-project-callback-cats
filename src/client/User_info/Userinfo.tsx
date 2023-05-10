import { useLocation, useNavigate } from "react-router-dom";
import "./Userinfo.css";
import Navbar from "../Navbar/Navbar";
import Login from "../Login/Login";
import React, { useState, useEffect } from "react";

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
      <Navbar />
      <div className="userinfo-title">Welcome, {state.name.toUpperCase()}</div>
      <div className="userinfo-body">
        <div className="body-info">
          <strong>Name : </strong> {state.name}
        </div>
        <div className="body-info">
          <strong>Email : </strong> {state.email}
        </div>
      </div>
      <div className="adoptBody">
        {filterCats.map((cat) => (
          <div key={cat.id} className="each-cat">
            <img src={cat.img_url} alt={cat.img_url} />
            <div className="cat-info">
              <p>
                <p>Donating by {cat.seller_name.toUpperCase()}</p>
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
                <button
                  type="button"
                  onClick={() => {
                    const deleteData = { cat_id: cat.id };
                    return fetch("http://127.0.0.1:5000/delete_cat_info", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(deleteData),
                    })
                      .then((res) => {
                        if (res.status === 200) {
                          return res.json();
                        }
                      })
                      .then((data) => {
                        console.log(data);
                      })
                      .catch((error) => {
                        console.log("error");
                      });
                  }}
                >
                  delete
                </button>
              </p>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="p-5 inline-block lg:align-top mt-4 lg:mt-8 text-black rounded-sm  shadow-md  shadow-red-400 hover:bg-red-400 hover:text-white"
        onClick={handleSubmit}
      >
        Click me to donate more cat
      </button>
      <button type="button" className="button-20" onClick={logout}>
        Log Out
      </button>
    </>
  );
}

export default UserInfo;
