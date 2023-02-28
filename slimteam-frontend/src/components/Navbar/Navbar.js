import React from 'react'
import './navbar.css'
import { NavLink} from 'react-router-dom';
import axios from "axios";
import Button from '@mui/material/Button';
import LogoCompany from './header.png'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

function Navbar({userLogin, setUserLogin,name}) {
  console.log(name)

  const {user, loading, logout, login} = useContext(AuthContext)
  console.log(user)

console.log(`User login status: ${userLogin}`)
  return (
    <>
     <div className='container-header'>
        <p><img className='img-header' src={LogoCompany} alt="logo-coffeeMeet"/></p>
    
      <div className='row container-navbar'>
        <ul className='col-8 lists-navbar'>
          <NavLink to="/" className='items-navbar'>About us</NavLink> |
          <NavLink to="/explore-experts" className='items-navbar'>Explore experts</NavLink> |
          <NavLink to="/meet-us" className='items-navbar'>Meet us</NavLink> |
          <NavLink to="/jobwall" className='items-navbar'>JobWall</NavLink> 
        </ul>
        <ul className='col-4 login-navbar'>
        
{/*         <Button variant="contained"><NavLink to={`${userLogin ? `/portfolio/${name}` : '/register'}` } className='items-buttons register'>{userLogin ? `${user}` : 'Register' }</NavLink></Button> |
        <Button variant="contained"><NavLink to={`${userLogin ? '/login' : '/login'}` } className='items-buttons'>{userLogin ? (<span onClick={logout}>Logout</span>) : 'Login' }</NavLink></Button> */}

        {user ? (
              <>
                <NavLink to={`/portfolio/${name}`}>Profile</NavLink> |
                <button className='items-buttons' onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to='/register'>Register</NavLink> |
                <button className='items-buttons'> <NavLink to='/login'>Login</NavLink>
                </button>
              </>
            )}
            
        </ul>
        </div>
      </div>
    </>
  )
}

export default Navbar
