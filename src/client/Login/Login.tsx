import React, { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import userAuth from '../Custom_hook/UserAuth';

import './Login.css';
import Navbar from '../Components/Navbar';
import Footer from '../Components/footer';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
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
      isValid ? '' : 'Email must be in the format example@example.com.'
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
        ? ''
        : 'Password must contain at least 8 characters, one number, and one uppercase letter.'
    );
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    // Submit the form if the email is valid
    if (emailError === '') {
      // Do something with the email
      console.log('Email:', email);
    }

    // Submit the form if the password is valid
    if (passwordError === '') {
      // Do something with the password
      console.log('Password:', password);
    }

    const data = {
      email: email,
      password: password,
    };

    console.log(email, password);
    return fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
          alert('password or email not found');
        } else {
          user_id = data.user_id;
          name = data.name;
          username = data.username;
          dataEmail = data.email;
          dataPassword = data.password;
          setAuth({ dataEmail, dataPassword, name, username, user_id });
          setEmail('');
          setPassword('');
          navigate('/userinfo', {
            state: { dataEmail, dataPassword, user_id, name, username },
          });
        }
      })
      .catch((error) => {
        console.log('error');
        alert('This email does not exist');
      });
  };

  const isFormValid = email !== '' && password !== '';

  return (
    <>
      <Navbar />
      <div className='loginContainer'>
        <div className='loginTitle'>
          <h1>Login</h1>
        </div>
        <section>
          <div className='imagecontainer'>
            <img
              src='https://s3-alpha.figma.com/hub/file/1844050371/ebbfb0be-4adb-45be-baa1-354c4f691440-cover.png'
              alt='loginCat'
              className='loginCat'
            />
          </div>
          <div className='formLogin'>
            <form>
              <div className='emailDiv'>
                <label htmlFor='email-input'>Email:</label>
                <input
                  type='email'
                  placeholder='Enter A New Email'
                  className='email'
                  id='email'
                  value={email}
                  onChange={handleEmailChange}
                  pattern='^[^\s@]+@[^\s@]+\.[^\s@]+$'
                  required
                ></input>
                {emailError && <p>{emailError}</p>}{' '}
              </div>
              <div className='passwordDiv'>
                <label htmlFor='password-input'>Password:</label>
                <input
                  type='password'
                  placeholder='Enter A New Password'
                  className='password'
                  id='password'
                  value={password}
                  onChange={handlePasswordChange}
                  pattern='^(?=.*\d)(?=.*[A-Z]).{8,}$'
                  required
                ></input>
                {passwordError && <p>{passwordError}</p>}
              </div>
              <div>
                <input type='checkbox' />
                Remember Me
              </div>
              <div>
                <a href='/register'>Don't have an account?</a>
              </div>
            </form>

            <button
              className='button-20'
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
