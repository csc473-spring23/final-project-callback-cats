import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import {FaBars } from 'react-icons/fa';


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); 

  const handleToggle = () => {
    setIsOpen(!isOpen); 
  };

  return (
    <nav className='container'>
      <div className='sidebar' style={{width: isOpen ? "200px" : "50px" }}>
        <FaBars className='bar' onClick={handleToggle}/>
        <div className='logo'>
          <h3 style={{display: isOpen ? "block" : "none"}}>Callback Cats</h3>
        </div>
        <div className='nav-elements'>
        <div className='list' style={{display: isOpen ? "block" : "none"}}>
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
                <li>
                <NavLink to='/login'>Login/Register</NavLink>
                </li>
            </ul>
        </div>
           
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;