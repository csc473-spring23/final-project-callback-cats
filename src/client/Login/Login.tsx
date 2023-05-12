import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import userAuth from "../Custom_hook/UserAuth";
import reminder from "../../../public/reminder.svg";
import "./Login.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/footer";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  let user_id: number;
  let name: string;
  let username: string;
  let dataEmail: string;
  let dataPassword: string;

  const navigate = useNavigate();

  const { setAuth } = userAuth();

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

    // Submit the form if the email is valid
    if (emailError === "") {
      // Do something with the email
      console.log("Email:", email);
    }

    // Submit the form if the password is valid
    if (passwordError === "") {
      // Do something with the password
      console.log("Password:", password);
    }

    const data = {
      email: email,
      password: password,
    };

    console.log(email, password);
    return fetch("http://127.0.0.1:5000/login", {
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
          alert("password or email not found");
        } else {
          user_id = data.user_id;
          name = data.name;
          username = data.username;
          dataEmail = data.email;
          dataPassword = data.password;
          setAuth({ dataEmail, dataPassword, name, username, user_id });
          setEmail("");
          setPassword("");
          navigate("/userinfo", {
            state: { dataEmail, dataPassword, user_id, name, username },
          });
        }
      })
      .catch((error) => {
        console.log("error");
        alert("This email does not exist");
      });
  };

  const isFormValid = email !== "" && password !== "";

  return (
    <>
      <Navbar />
      {/* new registe page */}
      <div className="grid md:grid-cols-2  grid-cols-1 md:mt-[150px] mt-[100px] ">
        {/* left side of sign in */}
        <div className="">
          <div className="text-center my-10">
            <h1 className="big-heading text-[#394867]">Log In</h1>
          </div>
          <div className="mx-auto px-10">
            <img
              className="lg:w-[70%] md:w-[90%] w-[70%] h-[450px] mx-auto md:inline-block hidden"
              src={reminder}
            ></img>
          </div>
        </div>
        {/* right side of sign in */}
        <div className="bg-white rounded-lg mx-5 py-[10%] px-[15%] shadow-md">
          <div>
            <form>
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
                <Link to={"/register"}>Don't have account! Sign up?</Link>
              </div>
              {/* submit button */}
              <button
                type="submit"
                className="inline-block w-full rounded bg-red-300 py-5 text-white hover:bg-red-400 shadow-md"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Log In
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* created extra space to work on new register page */}
      <div className="h-[100vh] w-full"></div>
      {/*  */}

      <div className="loginContainer">
        <div className="loginTitle">
          <h1>Login</h1>
        </div>
        <section>
          <div className="imagecontainer">
            <img
              src="https://s3-alpha.figma.com/hub/file/1844050371/ebbfb0be-4adb-45be-baa1-354c4f691440-cover.png"
              alt="loginCat"
              className="loginCat"
            />
          </div>
          <div className="formLogin">
            <form>
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
                <input type="checkbox" />
                Remember Me
              </div>
              <div>
                <a href="/register">Don't have an account?</a>
              </div>
            </form>

            <button
              className="button-20"
              onClick={handleSubmit}
              disabled={!isFormValid}
            >
              Log In
            </button>
          </div>
        </section>
      </div>
      {/* footer */}
      <Footer />
    </>
  );
}

export default Login;
