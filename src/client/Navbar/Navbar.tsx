import React from 'react';
import { NavLink } from 'react-router-dom';
// import { ReactComponent as Brand } from '../../assets/icons/logo.svg'
import './Navbar.css';

interface Props {email: string,
                password: string}



const Navbar = (props: Props) => {
  const valid = props.email == null || "" && props.password == null || "";
  return valid? (
    <nav className='navbar'>
      <div className='container'>
        <div className='logo'>
          <h3>Callback Cats</h3>
        </div>
        <div className='nav-elements'>
          
          <ul>
            <li>
              <NavLink to='/'>Home</NavLink>
            </li>
            <li>
              <NavLink to='/catfacts'>Cat Facts</NavLink>
            </li>
            <li>
              <NavLink to='/adopt'>Adopt</NavLink>
            </li>
            <li>
              <NavLink to='/donate'>Donate</NavLink>
            </li>
          </ul>
          </div>
      </div>
    </nav>
  ) : ( 
    <nav className='navbar'>
      <div className='container'>
        <div className='logo'>
          <h3>Callback Cats</h3>
        </div>
        <div className='nav-elements'>
          <ul>
            <li>
              <NavLink to='/'>Home</NavLink>
            </li>
            <li>
              <NavLink to='/catfacts'>Cat Facts</NavLink>
            </li>
            <li>
              <NavLink to='/adopt'>Adopt</NavLink>
            </li>
            <li className='loginreg'>
              <NavLink to='/login'>Login/Register</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
