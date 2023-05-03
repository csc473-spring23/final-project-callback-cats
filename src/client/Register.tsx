import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

interface RegisterProps {
  name: string;
  username: string;
  email: string;
  password: string;
  onSubmit: (data: RegisterProps) => void;
}

function Register(props: RegisterProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  const handleSubmit = () => {
    const data = {
      name: name,
      username: username,
      email: email,
      password: password,
    };
    //props.onSubmit(data);
    console.log(name, username, email, password);
    fetch('http://127.0.0.1:5000/sign_up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // do something with the server response
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
    navigate('/login');
  };

  return (
    <>
      <Navbar />
      <div className='registerContainer'>
        <div className='loginTitle'>
          <h1>Sign In</h1>
        </div>
        <section>
          <div className='imgLogin'>
            <img src='https://img.freepik.com/free-vector/cute-cat-playing-hand-phone-cartoon-vector-icon-illustration-animal-technology-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-4231.jpg?w=2000' />
          </div>
          <div className='formLogin'>
            <form>
              <div>
                Name:
                <input
                  type='name'
                  placeholder='Enter Your Name'
                  className='email'
                  id='name'
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                ></input>
              </div>
              <div>
                Username:
                <input
                  type='username'
                  placeholder='Create a new username'
                  className='email'
                  id='username'
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                ></input>
              </div>
              <div>
                Email:
                <input
                  type='email'
                  placeholder='Enter A New Email'
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
                  placeholder='Enter A New Password'
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
                <a href='/login'>Already have an account?</a>
              </div>
            </form>

            <button className='button-20' onClick={handleSubmit}>
              Register
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

export default Register;
