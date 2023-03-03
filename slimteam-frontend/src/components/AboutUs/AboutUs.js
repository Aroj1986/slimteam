import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./aboutUs.css";
import arojPicture from "./ArojPicture.jpg";
import logo from "../../images/logo.png";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

function AboutUs() {
  return (
    <div className="hero-page">
      <div className="d-flex flex-column justify-content-center align-items-center mt-3 mb-3">
        <div className="d-flex flex-row aroj justify-content-md-between align-items-center p-2">
          <div className="hero-section">
            <h2 className="slogan" style={{display:"inline"}}>Our Connection to Excellent <p style={{margin:"0.4rem",display:"inline"}}></p><img src={logo} height={70} width={60}></img> ervices</h2>
            <p className="paragraph">
              From minor repairs to major renovations, our service experts have got you covered - 
              <Button size="small" color="primary">
                              <NavLink
                                to={`/explore-experts`}
                                className="button-expert"
                                style={{textDecoration:"none",backgroundColor:"black"} }
                              >
                                BOOK NOW
                              </NavLink>
                            </Button> <br />Receive your future staff for your job within a few
              hours.
            </p>
          </div>
          <img
            className="image"
            src={arojPicture}
            alt="arojPicture"
            style={{ height: 350 }}
          />
        </div>
        <div className="line"></div>
        <br></br>
        
        <Carousel
          variant="dark"
          className="flex-carousel text-center"
          style={{ width: 300 }}
        >
          <Carousel.Item>
            <div className="reviews">
            <p>
              Through SlimTeam, we were able to find Staff
              within a few hours who more than fulfilled her job. We were very
              satisfied with the performance.
            </p>
            </div>
            
            <p>
            
              {" "}
              - <i>Mannhart GmbH</i> -{" "}
            </p>
          </Carousel.Item>
          <Carousel.Item>
          <div className="reviews">
            <p>
            To support participant management, we booked 16 promoters through Slimteam who greatly helped us and made the event a success.
            </p>
            <p>
              {" "}
              - <i>Dyson GmbH</i> -{" "}
              
            </p>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}

export default AboutUs;
