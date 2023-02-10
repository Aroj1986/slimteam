import React from 'react'
import './navbar.css'
import { NavLink} from 'react-router-dom';

function Navbar() {
  return (
    <>
      <div className='row container-navbar'>
        <ul className='col-8 lists-navbar'>
          <NavLink to="/" className='items-navbar'>About us</NavLink> |
          <NavLink to="/explore-experts" className='items-navbar'>Explore experts</NavLink> |
          <NavLink to="/meet-us" className='items-navbar'>Meet us</NavLink> |
          <NavLink to="/feedback" className='items-navbar'>Feedback</NavLink> 
        </ul>
        <ul className='col-4 login-navbar'>
          <NavLink to="/register" className='items-navbar'>Register</NavLink>  |
          <NavLink to="/login" className='items-navbar'>Login</NavLink>
        </ul>
      </div>
    </>
  )
}

export default Navbar
