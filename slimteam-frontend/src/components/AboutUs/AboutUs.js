import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./aboutUs.css";
import arojPicture from "./ArojPicture.jpg";

import HandymanIcon from "@mui/icons-material/Handyman";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import ImagesearchRollerIcon from "@mui/icons-material/ImagesearchRoller";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";

import logo from "../../images/logo.png";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

function AboutUs() {
  return (
    <div className="hero-page">
      <div className="d-flex flex-column justify-content-center align-items-center mt-3 mb-3 ">
        <div className="d-flex flex-row aroj justify-content-md-between align-items-center p-2">
          <div className="hero-section">
            <h2 className="slogan" style={{ display: "inline" }}>
              Our Connection to Excellent{" "}

              <p style={{ marginLeft: "0.4rem", marginRight: "0.4rem", display: "inline" }}></p>

              <img src={logo} height={70} width={60}></img> ervices
            </h2>
            <p className="paragraph">
              From minor repairs to major renovations, our service experts have
              got you covered -
              <Button size="small" color="primary">
                <NavLink
                  to={`/explore-experts`}
                  className="button-expert"
                  style={{ textDecoration: "none", backgroundColor: "black" }}
                >
                  BOOK NOW
                </NavLink>
              </Button>{" "}
              <br />
              Receive your future staff for your job within a few hours.
            </p>
          </div>
          <img
            className="image"
            src={arojPicture}
            alt="arojPicture"
            style={{ height: 350 }}
          />
        </div>
        <br></br>
        <div className="reviews">
          <div className="icons"> 
          <ElectricBoltIcon style={{ color: "gold", fontSize: "2.5rem" }} />
          <p>Electrician services</p>
          </div>

          <div className="icons"> 
          <HandymanIcon style={{ color: "grey", fontSize: "2.5rem" }} />
          <p>Plumbing services</p>
        </div>

        <div className="icons"> 
          <CleaningServicesIcon style={{ color: "#654321", fontSize: "2.5rem" }} />
              
                <p>Cleaning services</p>
        </div>

        <div className="icons"> 
        <ImagesearchRollerIcon style={{color: "#333333", fontSize: "2.5rem" }} />
              
                <p>Home Painting services</p>
        </div>

        <div className="icons"> 
        <ChildFriendlyIcon style={{ color: "green", fontSize: "3rem" }}/>
                <p>Nanny services</p>
        </div>
        </div>

        {/* <Carousel
          variant="dark"
          className="flex-carousel text-center"
          style={{ width: 300 }}
          indicators={false}
        >
          <Carousel.Item>
            <div className="reviews">
              <p>
                <HandymanIcon style={{ color: "grey", fontSize: "2.5rem" }} />
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
                <ElectricBoltIcon
                  style={{ color: "gold", fontSize: "2.5rem" }}
                />{" "}
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
                <CleaningServicesIcon
                  style={{ color: "brown", fontSize: "2.5rem" }}
                />{" "}
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
                <ImagesearchRollerIcon
                  style={{ color: "grey", fontSize: "2.5rem" }}
                />{" "}
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
                <ChildFriendlyIcon
                  style={{ color: "green", fontSize: "3rem" }}
                />{" "}
              </p>
              <p>
                {" "}
                <p>Nanny services</p>{" "}
              </p>
            </div>
          </Carousel.Item>
        </Carousel> */}
        <br />
        <br />
      </div>
    </div>
  );
}

export default AboutUs;
