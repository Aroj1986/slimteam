import React from "react";
import "./footer.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function Footer() {
  return (
    <div>
    <div className="container-contact">
      <div className="container-contact-address">
        <p className="logo">SM Team</p>
        <div className="social-media">
          <FacebookIcon />
          <TwitterIcon />
          <LinkedInIcon />
        </div>
        <p className="copyright">
          {" "}
          © 2023<script>document.write(new Date().getFullYear())</script> SM Team. All Rights Reserved.
        </p>
        <div className="line"></div><br />
      </div>
      <div className='footer-down'>
          <p className='footer-downs'>Privacy Statement</p> 
          <p className='footer-downs'>Terms and Conditions</p> 
          <p className='footer-downs'>Contact Us</p> 
          <p className='footer-downs'>Careers</p>
          <p className='footer-downs'>Newsroom</p>
        </div>
    </div>
    </div>
  );
}

export default Footer;
