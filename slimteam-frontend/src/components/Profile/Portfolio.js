import React from "react";
import Container from "react-bootstrap/Container";
import "./profile.css";
import axios from "axios";
import { useEffect, useState } from "react";
import ExperienceAdd from "./AddFunctionality/ExperienceAdd";
import EducationAdd from "./AddFunctionality/EducationAdd";
import CerticiationsAdd from "./AddFunctionality/CerticiationsAdd";
import LanguagesAdd from "./AddFunctionality/LanguagesAdd";
import UploadPic from "./UploadPic";

export default function Portfolio({ name, email }) {
  const [portfolio, setPortfolio] = useState();
  
  useEffect(() => {
    axios
      .get(`http://localhost:8888/portfolio/${name}`)
      .then((res) => {
        setPortfolio(res.data);
        // console.log(res.data)
      })
      .catch((err) => {
        console.log(`Error fetching sought expert in database: ${err}`);
      });
  }, [portfolio]);


  return (
    <Container>
      <div className="expert-portfolio">
        <div className="expert-description-container">
          <div className="banner"></div>

          <div className="upload">
            <img
              className="profile-picturee"
              src={portfolio?.personal_details.profile_picture}
              alt="Expert image"
              style={{ height: 150, width: 150 }}
            />
            <div className="camerabutton">
            <UploadPic name={name}/>
            </div>
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
              <h4>Professional experience </h4>  <ExperienceAdd id = {portfolio?._id} name = {portfolio?.personal_details.first_name} portfolio = {portfolio} setPortfolio={setPortfolio}/>
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
              <h4>Qualification / Trainings</h4> <EducationAdd id = {portfolio?._id} name = {portfolio?.personal_details.first_name} portfolio = {portfolio} setPortfolio={setPortfolio}/>
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
              <h4>License / Certification</h4> <CerticiationsAdd id = {portfolio?._id} name = {portfolio?.personal_details.first_name} portfolio = {portfolio} setPortfolio={setPortfolio}/>
            </div>
            {portfolio?.certifications.map((certification) => {
              return (
                <div>
                 <ul>
                   <strong> {certification?.certification_name}</strong>{" "}
                   <div className="startandend">
                     {certification.valid_from}
                   </div>{" "}
                 </ul>
               </div>
              );
            })}
          </div>

          <div className="professional-experience">
            <div className="portfoliobutton">
              <h4>Languages</h4> <LanguagesAdd id = {portfolio?._id} name = {portfolio?.personal_details.first_name} portfolio = {portfolio} setPortfolio={setPortfolio}/>
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
