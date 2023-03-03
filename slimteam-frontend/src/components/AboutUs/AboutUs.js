import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./aboutUs.css";
import arojPicture from "./ArojPicture.jpg";
import HandymanIcon from "@mui/icons-material/Handyman";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import ImagesearchRollerIcon from '@mui/icons-material/ImagesearchRoller';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';

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
          indicators={false}
        >
          <Carousel.Item>
            <div className="reviews">
              <p>
                <HandymanIcon style={{ color: "grey", fontSize: "2.5rem" }}/>
              </p>
            

            <p>
              {" "}
              <p>Plumbing services</p>{" "}
            </p>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="reviews">
              <p>
                <ElectricBoltIcon style={{ color: "gold", fontSize: "2.5rem"}}/>{" "}
              </p>
              <p>
                {" "}
                <p>Electrician services</p>{" "}
              </p>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="reviews">
              <p>
                <CleaningServicesIcon style={{ color: "brown", fontSize: "2.5rem" }} />{" "}
              </p>
              <p>
                {" "}
                <p>Cleaning services</p>{" "}
              </p>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="reviews">
              <p>
                <ImagesearchRollerIcon style={{color: "grey", fontSize: "2.5rem" }} />{" "}
              </p>
              <p>
                {" "}
                <p>Home Painting services</p>{" "}
              </p>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="reviews">
              <p>
                <ChildFriendlyIcon style={{ color: "green", fontSize: "3rem" }}/>{" "}
              </p>
              <p>
                {" "}
                <p>Nanny services</p>{" "}
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
