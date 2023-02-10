import React from 'react'
import './header.css'
import LogoCompany from './header.png'
 

function Header() {
  return (
    <div className='container-header'>
        <p><img className='img-header' src={LogoCompany} alt="logo-coffeeMeet"/></p>
        <h2 className='slogan-header'>Our Commitment for Excellent Services</h2>
    </div>
  )
}

export default Header
