import React from 'react'
import './navbar.css'
import { NavLink} from 'react-router-dom';
import axios from "axios";


function Navbar({userLogin, setUserLogin}) {

  const logoutOnClick = (e) => {
    axios
      .post("http://localhost:8888/logout")
      .then((res) => {
        console.log(`Backend: ${res.data}`);
        console.log("Frontend: User is logged out");
      })
      .catch((err) => {
        if (err) {
          console.log(`Error logging out the user ${err}`);
        }
      });
      setUserLogin(false)
  };
console.log(`User login status: ${userLogin}`)
  return (
    <>
      <div className='row container-navbar'>
        <ul className='col-8 lists-navbar'>
          <NavLink to="/" className='items-navbar'>About us</NavLink> |
          <NavLink to="/explore-experts" className='items-navbar'>Explore experts</NavLink> |
          <NavLink to="/meet-us" className='items-navbar'>Meet us</NavLink> |
          <NavLink to="/jobwall" className='items-navbar'>JobWall</NavLink> 
        </ul>
        <ul className='col-4 login-navbar'>
          <NavLink to={`${userLogin ? '/profile' : '/register'}` } className='items-navbar'>{userLogin ? 'Profile' : 'Register' }</NavLink> |
          <NavLink to={`${userLogin ? '/login' : '/login'}` } className='items-navbar'>{userLogin ? (<span onClick={logoutOnClick}>Logout</span>) : 'Login' }</NavLink>
        </ul>
      </div>
    </>
  )
}

export default Navbar
