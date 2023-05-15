import { type } from "os";
import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginNavbar from "../Components/LogoutNavBar";
import userAuth from "../Custom_hook/UserAuth";
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

  let auth_: any;

  auth_ = userAuth();
  const { auth } = auth_;

  const { loggedIn, dataEmail, dataPassword, dataName, username, user_id } =
    auth;
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

    //console.log(name, age, description, breed, gender);
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
          nav("/userinfo");
        }
      })
      .catch((error) => {
        console.log("error");
      });
  };

  return (
    <>
      {auth?.dataEmail ? (
        <LoginNavbar />
      ) : (
        <>
          {alert("You can not access this page without logging in")} <Login />
        </>
      )}
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
      <div className="main">
        <div className="sellBody">
          <div className="sellBodyTitle">Enter Your Cat Info</div>
          <div className="midBody">
            <form>
              <div className="bodyContent">
                <label htmlFor="name"> Name: </label>
                <div className="textfield">
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
              </div>

              <div className="bodyContent">
                <label htmlFor="age"> Age: </label>
                <div className="textfield">
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
              </div>

              <div className="bodyContent">
                <label htmlFor="description"> Description: </label>
                <div className="textfield">
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
              </div>
              <div className="bodyContent">
                <label htmlFor="breed"> Breed: </label>
                <div className="textfield">
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
              </div>

              <div className="bodyContent">
                <label htmlFor="gender"> Gender: </label>
                <div className="textfield">
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
              </div>

              <div className="uploadImage">
                <div className="uploadTitle">Upload Your Cat's Image</div>
                <div className="catImage">
                  <img
                    // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs2h0Vk15Cz4w6aXzhSKxW3tcPJU6fiFHUaw&usqp=CAU"
                    src="https://64.media.tumblr.com/93cc22ccda31679f83bb81dbe4a1bff8/0767393739a2484f-a9/s540x810/a1a2116a0479ecf9517de58e858ab33f5199d512.pnj"
                    alt="caticons"
                    className="caticons"
                  />
                </div>

                <div className="bodyContentUpload">
                  <label htmlFor="img_url">Image Url:</label>
                  <div className="textfield">
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

                <div className="sellBtn">
                  <button
                    type="button"
                    className="button-20"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Donatepage;
