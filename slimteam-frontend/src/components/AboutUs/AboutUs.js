import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./aboutUs.css";
import arojPicture from "./ArojPicture.jpg";

function AboutUs() {
  return (
    <div className="hero-page">
      <div className="d-flex flex-column justify-content-center align-items-center mt-3 mb-3 ">
        <div className="d-flex flex-row aroj justify-content-md-between align-items-center p-2">
          <div className="hero-section">
            <h2 className="slogan">Our Connection to Excellent Services</h2>
            <p className="paragraph">
              From minor repairs to major renovations, our service experts have
              got you covered - book now <br />
              Receive your future staff for your job within a few hours.
            </p>
          </div>
          <img
            className="image"
            src={arojPicture}
            alt="arojPicture"
            // src="https://static5.abbyy.com/abbyycommedia/32760/02a-profservices-customers.jpg"
            style={{ height: 350 }}
          />
        </div>
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
      <br />
      <br />
    </div>
    </div>
  );
}

export default AboutUs;
