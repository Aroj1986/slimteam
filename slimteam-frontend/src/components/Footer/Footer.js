import React from 'react'
import './footer.css'
import LogoPartners from './partners.png'

function Footer() {

  return (
    <>
        <div className='container-footer'>
            <p className='container-partners-text'>Who has hired our experts</p>
            <div className='container-partners-logo'>
                <p><img className='partner-logo' src={LogoPartners} alt="logo-company"/></p>
                <p><img className='partner-logo' src={LogoPartners} alt="logo-company"/></p>
                <p><img className='partner-logo' src={LogoPartners} alt="logo-company"/></p>
                <p><img className='partner-logo' src={LogoPartners} alt="logo-company"/></p>
                <p><img className='partner-logo' src={LogoPartners} alt="logo-company"/></p>
            </div>
            <div className='container-subscribe'>
              <p>Stay connected for our recent newsletter !</p>
              <button onClick={() => alert("Enter your email address to subscribe")}>Subscribe</button>
            </div>
            <div className='container-contact'>
              <div className='container-contact-address'>
                <h5>SlimTeam (Head Office)</h5>
                <p className='paragraph'>Central Park Str. 55</p>
                <p className='paragraph'>68059 Berlin, Germany</p>
                <p className='paragraph'>+49 (0) - XXX - XXX - XXXX</p>
                <a href="mailto:info@slimteam.com">info@slimteam.com</a>

              </div>
              <div className='container-contact-telephone'>
                <h5>Hours of Operation (Central European)</h5>
                <p className='paragraph'>Monday - Friday: 09:00 - 18:00</p>
                <p className='paragraph'>Saturday - Sunday: closed</p>
              </div>
            </div>
            <p className='container-copyright'> © 2022<script>document.write(new Date().getFullYear())</script> AB Tech Group</p>
        </div>
    </>
  )
}

export default Footer
