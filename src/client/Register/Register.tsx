import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "../Login/Login.css";
import Footer from "../Components/footer";
import stepToSun from "../../../public/step-to-sun.svg";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (event: any) => {
    const value = event.target.value;
    setEmail(value);

    // Check if the email matches the regex pattern
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = regex.test(value);

    // Update the error message
    setEmailError(
      isValid ? "" : "Email must be in the format example@example.com."
    );
  };

  const handlePasswordChange = (event: any) => {
    const value = event.target.value;
    setPassword(value);

    // Check if the password matches the regex pattern
    const regex = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;
    const isValid = regex.test(value);

    // Update the error message
    setPasswordError(
      isValid
        ? ""
        : "Password must contain at least 8 characters, one number, and one uppercase letter."
    );
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (emailError === "") {
      console.log("Email:", email);
    }

    if (passwordError === "") {
      console.log("Password:", password);
    }

    const data = {
      name: name,
      username: username,
      email: email,
      password: password,
    };
    //props.onSubmit(data);
    console.log(name, username, email, password);
    return fetch("http://127.0.0.1:5000/sign_up", {
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
        console.log(data);
        if (data.code === 400) {
          alert("user already exits");
        } else {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log("error");
      });
  };
  const signUpImg =
    "https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg";
  const isFormValid =
    email !== "" && password !== "" && username !== "" && name !== "";

  return (
    <>
      <Navbar />

      {/* new registe page */}
      <div className="grid md:grid-cols-2  grid-cols-1 md:mt-[150px] mt-[100px] ">
        {/* left side of sign in */}
        <div className="">
          <div className="text-center my-10">
            <h1 className="big-heading text-red-400">Sign Up</h1>
          </div>
          <div className="mx-auto px-10">
            <img
              className="lg:w-[70%] md:w-[90%] w-[70%] mx-auto md:inline-block hidden"
              src={stepToSun}
            ></img>
          </div>
        </div>
        {/* right side of sign in */}
        <div className="bg-white rounded-lg mx-5 py-[10%] px-[15%] shadow-md">
          <div>
            <form>
              {/* name input */}
              <div className="relative " data-te-input-wrapper-init>
                <input
                  type="text"
                  className="peer block min-h-[auto] w-full rounded border-2  bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="name"
                  placeholder="Name"
                />
                <label
                  id="name-label"
                  className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                >
                  Name
                </label>
              </div>
              {/* username input */}
              <div className="relative " data-te-input-wrapper-init>
                <input
                  type="text"
                  className="peer block min-h-[auto] w-full rounded border-2  bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="username"
                  placeholder="Username"
                />
                <label
                  id="username-label"
                  className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                >
                  Username
                </label>
              </div>

              {/* email input */}
              <div className="relative " data-te-input-wrapper-init>
                <input
                  type="text"
                  className="peer block min-h-[auto] w-full rounded border-2  bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="exampleFormControlInput3"
                  placeholder="Email address"
                />
                <label
                  id="exampleFormControlInput3"
                  className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                >
                  Email address
                </label>
              </div>
              {/* password input */}
              <div className="relative " data-te-input-wrapper-init>
                <input
                  type="text"
                  className="peer block min-h-[auto] w-full rounded border-2  bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="password"
                  placeholder="Password"
                />
                <label
                  id="password-label"
                  className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                >
                  Password
                </label>
              </div>
              <div className="flex flex-row-reverse text-gray-400 hover:text-black">
                <Link to={"/login"}>Already have account</Link>
              </div>
              {/* submit button */}
              <button
                type="submit"
                className="inline-block w-full rounded bg-red-300 py-5 text-white hover:bg-red-400 shadow-md"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* created extra space to work on new register page */}
      <div className="h-[100vh] w-full"></div>
      {/*  */}
      <div className="registerContainer">
        <div className="loginTitle">
          <h1>Sign In</h1>
        </div>
        <section>
          <div className="imagecontainer">
            <img
              src="https://img.freepik.com/free-vector/cute-cat-playing-hand-phone-cartoon-vector-icon-illustration-animal-technology-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-4231.jpg?w=2000"
              alt="registerCat"
              className="loginCat"
            />
          </div>
          <div className="formLogin">
            <form>
              <div>
                <label htmlFor="name-input">Name:</label>
                <input
                  type="name"
                  placeholder="Enter Your Name"
                  className="email"
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                ></input>
              </div>
              <div>
                <label htmlFor="username-input">Username:</label>
                <input
                  type="username"
                  placeholder="Create a new username"
                  className="password"
                  id="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                ></input>
              </div>
              <div className="emailDiv">
                <label htmlFor="email-input">Email:</label>
                <input
                  type="email"
                  placeholder="Enter A New Email"
                  className="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                  required
                ></input>
                {emailError && <p>{emailError}</p>}{" "}
              </div>
              <div className="passwordDiv">
                <label htmlFor="password-input">Password:</label>
                <input
                  type="password"
                  placeholder="Enter A New Password"
                  className="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  pattern="^(?=.*\d)(?=.*[A-Z]).{8,}$"
                  required
                ></input>
                {passwordError && <p>{passwordError}</p>}
              </div>
              <div>
                <a href="/login">Already have an account?</a>
              </div>
            </form>

            <button
              className="button-20"
              onClick={handleSubmit}
              disabled={!isFormValid}
            >
              Register
            </button>
          </div>
        </section>
      </div>
      {/* footer */}
      <Footer />
    </>
  );
}

export default Register;
