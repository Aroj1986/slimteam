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
// import AddButtonForm from "./AddButtonForm";
import moment from "moment";
import TimeCalculator from "./TimeCalculator";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditSharpIcon from "@mui/icons-material/EditSharp";

export default function Portfolio({ name, email,setName }) {
  const [portfolio, setPortfolio] = useState();
 

  useEffect(() => {
    axios
      .get(`http://localhost:8888/portfolio/${name}`)
      .then((res) => {
        setPortfolio(res.data);
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
                    <div className="experience-item">
                      <h6>
                        <strong>{exp?.position}</strong>
                      </h6>{" "}
                      <div>
                      <IconButton aria-label="delete" size="large">
                        <EditSharpIcon
                          fontSize="inherit"
                          onClick={() => {
                            const experience = {
                              experience: {
                                institution: exp?.institution,
                                position: exp?.position,
                                from_date: exp?.from_date,
                                until_date: exp?.until_date,
                              },
                            };

                            axios
                              .put(
                                `http://localhost:8888/portfolio/${portfolio?.personal_details?.first_name}/delete-experience`,
                                experience
                              )
                              .then((res) => {
                                setPortfolio(res.data);
                              })
                              .catch((err) => {
                                console.log(
                                  `Error deleting experience in database: ${err}`
                                );
                              });
                          }}
                        />
                      </IconButton>

                      <IconButton aria-label="delete" size="large">
                        <DeleteIcon
                          fontSize="inherit"
                          onClick={() => {
                            const experience = {
                              experience: {
                                institution: exp?.institution,
                                position: exp?.position,
                                from_date: exp?.from_date,
                                until_date: exp?.until_date,
                              },
                            };

                            axios
                              .put(
                                `http://localhost:8888/portfolio/${portfolio?.personal_details?.first_name}/delete-experience`,
                                experience
                              )
                              .then((res) => {
                                setPortfolio(res.data);
                              })
                              .catch((err) => {
                                console.log(
                                  `Error deleting experience in database: ${err}`
                                );
                              });
                          }}
                        />
                      </IconButton>
                      </div>
                    
                    </div>
                    <div>
                      <h6>at {exp?.institution}</h6>{" "}
                    </div>
                    <div className="startandend">
                      <p>
                        {moment(exp?.from_date).format("MMM YYYY")} -{" "}
                        {moment(exp?.until_date).format("MMM YYYY")} .{" "}
                        <TimeCalculator
                          date1={exp?.from_date}
                          date2={exp?.until_date}
                        />
                      </p>
                    </div>{" "}
                  </ul>
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
                    <div className="experience-item">
                      <h6>
                        <strong>{edu?.degree}</strong>
                      </h6>{" "}
                      <IconButton aria-label="delete" size="large">
                        <DeleteIcon
                          fontSize="inherit"
                          onClick={() => {
                            const education = {
                              education: {
                                institute: edu?.institute,
                                degree: edu?.degree,
                                start_date: edu?.start_date,
                                end_date: edu?.end_date,
                              },
                            };

                            console.log(education);
                            axios
                              .put(
                                `http://localhost:8888/portfolio/${portfolio?.personal_details?.first_name}/delete-education`,
                                education
                              )
                              .then((res) => {
                                setPortfolio(res.data);
                              })
                              .catch((err) => {
                                console.log(
                                  `Error deleting education in database: ${err}`
                                );
                              });
                            console.log(education);
                          }}
                        />
                      </IconButton>
                      
                    </div>
                    <div>
                      <h6>at {edu?.institute}</h6>{" "}
                    </div>
                    <div className="startandend">
                      <p>
                        {moment(edu?.start_date).format("MMM YYYY")} -{" "}
                        {moment(edu?.end_date).format("MMM YYYY")} .{" "}
                        <TimeCalculator
                          date1={edu?.start_date}
                          date2={edu?.end_date}
                        />
                      </p>
                    </div>{" "}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="professional-experience">
            <div className="portfoliobutton">
              <h4>License / Certification</h4> <CerticiationsAdd id = {portfolio?._id} name = {portfolio?.personal_details.first_name} portfolio = {portfolio} setPortfolio={setPortfolio}/>
            </div>

            {portfolio?.certifications.map((cert) => {
              return (
                <div>
                  <ul>
                    <div className="experience-item">
                      <h6>
                        <strong>{cert?.certification_name}</strong>
                      </h6>{" "}
                      <IconButton aria-label="delete" size="large">
                        <DeleteIcon
                          fontSize="inherit"
                          onClick={() => {
                            const certifications = {
                              certifications: {
                                certification_name: cert?.certification_name,
                              },
                            };

                            console.log(certifications);
                            axios
                              .put(
                                `http://localhost:8888/portfolio/${portfolio?.personal_details?.first_name}/delete-certification`,
                                certifications
                              )
                              .then((res) => {
                                setPortfolio(res.data);
                              })
                              .catch((err) => {
                                console.log(
                                  `Error deleting education in database: ${err}`
                                );
                              });
                            console.log(certifications);
                          }}
                        />
                      </IconButton>
                      
                    </div>
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="professional-experience">
            <div className="portfoliobutton">
              <h4>Languages</h4> <LanguagesAdd id = {portfolio?._id} name = {portfolio?.personal_details.first_name} portfolio = {portfolio} setPortfolio={setPortfolio}/>
            </div>

            

            {portfolio?.languages.map((lang) => {
              return (
                <div>
                  <ul>
                    <div className="experience-item">
                      <h6>
                        <strong>{lang?.language}:</strong> {lang?.proficiency}
                      </h6>{" "}
                      <IconButton aria-label="delete" size="large">
                        <DeleteIcon
                          fontSize="inherit"
                          onClick={() => {
                            const languages = {
                              languages: {
                                language: lang?.language,
                                proficiency: lang?.proficiency,
                              },
                            };

                            console.log(languages);
                            axios
                              .put(
                                `http://localhost:8888/portfolio/${portfolio?.personal_details?.first_name}/delete-language`,
                                languages
                              )
                              .then((res) => {
                                setPortfolio(res.data);
                              })
                              .catch((err) => {
                                console.log(
                                  `Error deleting education in database: ${err}`
                                );
                              });
                            console.log(languages);
                          }}
                        />
                      </IconButton>

                    </div>
                  </ul>
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