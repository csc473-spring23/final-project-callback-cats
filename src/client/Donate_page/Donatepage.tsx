import { type } from "os";
import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Errorpage from "../Error_page/Errorpage";
import "./Donatepage.css";
import Login from "../Login/Login";

function Donatepage() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [img_url, setImg_url] = useState("");
  const [description, setDescription] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");

  let email: string;
  let password: string;
  let user_id: number;
  let newName: string;
  let newUsername: string;

  const { state } = useLocation();
  //const { email, password, user_id } = state;

  if (state) {
    //const { email, password, user_id } = state;
    email = state.email;
    password = state.password;
    user_id = state.user_id;
    newName = state.name;
    newUsername = state.username;
  }

  const nav = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const data = {
      name: name,
      img_url: img_url,
      age: age,
      description: description,
      breed: breed,
      gender: gender,
      seller_id: user_id,
    };

    console.log(name, age, description, breed, gender);
    return fetch("http://127.0.0.1:5000/upload_cat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        if (data.code === 200) {
          alert("Your cat info is uploaded");
          nav("/adopt", {
            state: { email, password, user_id, newName, newUsername },
          });
        }
      })
      .catch((error) => {
        console.log("error");
      });
  };

  return state === null ? (
    <>
      {alert("This page can not be accessed without sign in")}
      <Login />
    </>
  ) : (
    <>
      <Navbar />
      <div className="sellTitle">
        <h1 className="text-6xl">
          Donate Your{" "}
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT32OiDDnK2CFHGPu1L3G00Y_ErAXeSwBbajQ&usqp=CAU"
            alt="cat"
          />{" "}
          Here!
        </h1>
      </div>
      <div className="sellBody">
        <div className="sellBodyTitle">Enter Your Cat Info</div>
        <div className="midBody">
          <form>
            <div className="bodyContent">
              <label htmlFor="name"> Name: </label>
              <input
                type="text"
                value={name}
                id="name"
                placeholder="Enter Your Cat's Name"
                className="catName"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></input>
            </div>

            <div className="bodyContent">
              <label htmlFor="age"> Age: </label>
              <input
                type="number"
                value={age}
                id="age"
                placeholder="Enter Your Cat's Age"
                className="catAge"
                onChange={(e) => {
                  setAge(e.target.valueAsNumber);
                }}
              ></input>
            </div>

            <div className="bodyContent">
              <label htmlFor="description"> Description: </label>
              <input
                type="text"
                value={description}
                id="description"
                className="catDescrip"
                placeholder="Write something about your cat..."
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></input>
            </div>
            <div className="bodyContent">
              <label htmlFor="breed"> Breed: </label>
              <input
                type="text"
                value={breed}
                id="breed"
                placeholder="Enter Your Cat's Breed"
                className="catBreed"
                onChange={(e) => {
                  setBreed(e.target.value);
                }}
              ></input>
            </div>

            <div className="bodyContent">
              <label htmlFor="gender"> Gender: </label>
              <input
                type="text"
                value={gender}
                id="gender"
                placeholder="Enter Your Cat's Gender"
                className="catGender"
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              ></input>
            </div>
          </form>
          <div className="catImage">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs2h0Vk15Cz4w6aXzhSKxW3tcPJU6fiFHUaw&usqp=CAU"
              alt="caticons"
              className="caticons"
            />
            <div className="catImgL">
              <label htmlFor="img_url">Image Url:</label>
              <input
                type="url"
                value={img_url}
                id="img_url"
                className="catImg"
                onChange={(e) => {
                  setImg_url(e.target.value);
                }}
              ></input>
            </div>
          </div>
        </div>
        <div className="sellBtn">
          <button type="button" className="button-20" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default Donatepage;
