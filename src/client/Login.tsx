import React, { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './Login.css';
import Navbar from './Navbar';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/buy');
  };

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
              <div>
                Email:
                <input
                  type='email'
                  placeholder='Enter Your Email'
                  className='email'
                  id='email'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></input>
              </div>
              <div>
                Password:
                <input
                  type='password'
                  placeholder='Enter Your Password'
                  className='password'
                  id='password'
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                ></input>
              </div>
              <div>
                <input type='checkbox' />
                Remember Me
              </div>
              <div>
                <a href='/register'>Forgot your password?</a>
              </div>
            </form>

            <button className='button-20' onSubmit={handleSubmit}>
              Log In
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

export default Login;
