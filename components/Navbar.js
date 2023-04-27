import { NavLink } from 'react-router-dom'
// import { ReactComponent as Brand } from '../../assets/icons/logo.svg'
import './navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <h3>Callback Cats</h3>
        </div>
        <div className="nav-elements">
            <ul>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/catfacts">Cat Facts</NavLink>
              </li>
              <li>
                <NavLink to="/buy">Buy</NavLink>
              </li>
              <li>
                <NavLink to="/sell">Sell</NavLink>
              </li>
              <li>
                <NavLink to="/trade">Trade</NavLink>
              </li>
              <li className="loginreg">
                <NavLink to="/loginreg">Login/Register</NavLink>
              </li>
            </ul>
        
        </div>
         
      </div>
      
       
    </nav>
  )
}

export default Navbar