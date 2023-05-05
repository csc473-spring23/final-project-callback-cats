import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

interface RegisterProps {
  name: string;
  username: string;
  email: string;
  password: string;
  passwordError: string;
  emailError: string;
  onSubmit: (data: RegisterProps) => void;
}

function Register(props: RegisterProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  const navigate = useNavigate();

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

    if (emailError === '') {
      console.log('Email:', email);
    }

    if (passwordError === '') {
      console.log('Password:', password);
    }

    const data = {
      name: name,
      username: username,
      email: email,
      password: password,
    };
    //props.onSubmit(data);
    console.log(name, username, email, password);
    return fetch('http://127.0.0.1:5000/sign_up', {
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
          alert('user already exits');
        } else {
          navigate('/login');
        }
      })
      .catch((error) => {
        console.log('error');
      });
  };

  const isFormValid =
    email !== '' && password !== '' && username !== '' && name !== '';

  return (
    <>
      <Navbar />
      <div className='registerContainer'>
        <div className='loginTitle'>
          <h1>Sign In</h1>
        </div>
        <section>
          <div className='imagecontainer'>
            <img
              src='https://img.freepik.com/free-vector/cute-cat-playing-hand-phone-cartoon-vector-icon-illustration-animal-technology-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-4231.jpg?w=2000'
              alt='registerCat'
              className='loginCat'
            />
          </div>
          <div className='formLogin'>
            <form>
              <div>
                <label htmlFor='name-input'>Name:</label>
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
                <label htmlFor='username-input'>Username:</label>
                <input
                  type='username'
                  placeholder='Create a new username'
                  className='password'
                  id='username'
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                ></input>
              </div>
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
                <a href='/login'>Already have an account?</a>
              </div>
            </form>

            <button
              className='button-20'
              onClick={handleSubmit}
              disabled={!isFormValid}
            >
              Register
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

export default Register;
