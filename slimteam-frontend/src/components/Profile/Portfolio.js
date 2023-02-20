import React from "react";
import Container from "react-bootstrap/Container";
import "./profile.css";
import axios from "axios";
import { useEffect, useState } from "react";
import AddButtonForm from "./AddButtonForm";

export default function Portfolio({ name }) {
  const [portfolio, setPortfolio] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:8888/portfolio/${name}`)
      .then((res) => {
        setPortfolio(res.data);
        console.log(res.data)
      })
      .catch((err) => {
        console.log(`Error fetching sought expert in database: ${err}`);
      });
  }, [name]);


  return (
    <Container>
      <div className="expert-portfolio">
        <div className="expert-description-container">
          <div className="banner"></div>

          <div>
            <img
              className="profile-picture"
              src="https://wallpapercave.com/wp/wp10092195.jpg"
              alt="Expert image"
              style={{ height: 150, width: 150 }}
            />
          </div>

          <div className="expert-headline">
            <div className="name-address">
              <h4>
                <b>
                  {portfolio?.personal_details.first_name}{" "}
                  {portfolio?.personal_details.last_name}
                </b>
              </h4>
              {/* <h6>City || Country</h6> */}
              <div className="skills">
                {" "}
                Skilled in :
                {portfolio?.personal_details.skills.map((skill) => {
                  return <h6> {skill}</h6>;
                })}
              </div>
            </div>
          </div>

          <div className="professional-experience">
            <div className="portfoliobutton">
              {" "}
              <h4>Professional experience </h4>  <AddButtonForm id = {portfolio?._id} name = {portfolio?.personal_details.first_name} portfolio = {portfolio} setPortfolio={setPortfolio}/>
            </div>

            {portfolio?.experience.map((exp) => {
              return (
                <div>
                  <ul>
                    <strong> {exp?.institution} </strong>{" "}
                    <div className="startandend">
                      {" "}
                      {exp.from_date} - {exp.until_date} . 7 months
                    </div>{" "}
                  </ul>
                  <ul>{exp.position}</ul>
                </div>
              );
            })}
          </div>

          <div className="professional-experience">
            <div className="portfoliobutton">
              <h4>Qualification / Trainings</h4> <button>ADD</button>
            </div>
            {portfolio?.education.map((edu) => {
              return (
                <div>
                  <ul>
                    <strong> {edu?.institute}</strong>{" "}
                    <div className="startandend">
                      {edu.start_date} - {edu.end_date} . 7 months
                    </div>{" "}
                  </ul>
                  <ul>{edu?.degree}</ul>
                </div>
              );
            })}
          </div>

          <div className="professional-experience">
            <div className="portfoliobutton">
              <h4>License / Certification</h4> <button>ADD</button>
            </div>
            {portfolio?.certifications.map((certification) => {
              return (
                <div>
                  <ul>{certification.certification_name}</ul>
                </div>
              );
            })}
          </div>

          <div className="professional-experience">
            <div className="portfoliobutton">
              <h4>Languages</h4> <button>ADD</button>
            </div>
            {portfolio?.languages.map((language) => {
              return (
                <div>
                  <ul>
                    <strong> {language?.language}</strong>{" "}
                  </ul>
                  <ul>{language?.proficiency}</ul>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rate-review-container">
          <div className="expert-headline">
            <div className="name-address">
              <h4>
                <b>Full Name</b>
              </h4>
              <h6>
                <b>street</b>
              </h6>
              <h6>City </h6>
              <h6>Country</h6>
              <h6>hourly_rate : 6€</h6>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
