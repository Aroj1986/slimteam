import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./aboutUs.css";

function AboutUs() {
  return (
    <div className="hero-page">
      <div className="d-flex flex-column justify-content-center align-items-center mt-3 mb-3">
        <div className="d-flex flex-row  justify-content-md-between align-items-center p-2">
          <div className="hero-section">
          <h2 className="slogan">Our Connection to Excellent Services</h2>
          <p className="paragraph">Over 50 experienced Staff Members, High customer satisfaction guaranteed.
            Receive your future staff for your job within a few hours.
          </p>
          </div>
          <img
            className="image"
            src="https://static5.abbyy.com/abbyycommedia/32760/02a-profservices-customers.jpg"
            style={{ height: 400 }}
          />
          
        </div>

        <br></br>

        <Carousel
          variant="dark"
          className="flex-carousel text-center"
          style={{ width: 300 }}
        >
          <Carousel.Item>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus,
              fugit quam facere nobis corporis molestias deserunt!
            </p>
            <p>
              {" "}
              - <i>WBS Coding School</i> -{" "}
            </p>
          </Carousel.Item>
          <Carousel.Item>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus,
              fugit quam facere nobis corporis molestias deserunt!
            </p>
            <p>
              {" "}
              - <i>Agentur für Arbeit</i> -{" "}
            </p>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}

export default AboutUs;
