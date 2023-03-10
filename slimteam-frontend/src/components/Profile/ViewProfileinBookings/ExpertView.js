import React from "react";
import "../profile.css";
import axios from "../../../axiosClient";
import { useEffect, useState } from "react";
import moment from "moment";
import TimeCalculator from "../TimeCalculator";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { CardActionArea,CardActions } from "@mui/material";
import { useParams } from "react-router-dom";


export default function ExpertView() {
  const [portfolio, setPortfolio] = useState();
  const {name} = useParams();

  useEffect(() => {
    const getPortfolio = () => {
      axios
        .get(`/api/explore-experts/portfolio/${name}`)
        .then((res) => {
          setPortfolio(res.data);
        })
        .catch((err) => {
          console.log(`Error fetching sought expert in database: ${err}`);
        });
    };
    name && getPortfolio();
  }, [name]);

  console.log(portfolio?.hourly_rate)
  return (
    <>
      {portfolio ? (
        <div>
          <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          paddingTop: "5rem",
          paddingBottom: "2rem",
          left: "20px",
        }}
      >
        <div className="upload">
          {/* <div className="camerabutton">
            <UploadPic name={name} />
          </div> */}
          <img
            className="profile-picturee"
            src={portfolio?.personal_details.profile_picture}
            alt="Expert image"
            style={{
              height: 150,
              width: 150,
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "3rem",
        }}
      >
        <Card
          style={{
            backgroundColor: "rgba(255, 250, 250)",
            padding: "0rem",
            borderRadius: "1rem",
            maxWidth: "800px",
            width: "100%",
          }}
        >
          <CardActionArea>
          <CardContent>
            <div className="professional-experience">
              <div className="portfoliobutton">
                <h6>
                  <strong>Personal Details</strong>
                </h6>
                {"\n"}

                {/* <HeadlineEditExpert
                  id_expert={portfolio?._id}
                  name={name}
                  first_name={portfolio?.personal_details.first_name}
                  last_name={portfolio?.personal_details.last_name}
                  skills={portfolio?.personal_details.skills}
                  street={portfolio?.personal_details.address.street}
                  city={portfolio?.personal_details.address.city}
                  nationality={portfolio?.personal_details.nationality}
                  hourly_rate={portfolio?.hourly_rate}
                  portfolio={portfolio}
                  setPortfolio={setPortfolio}
                  setName={setName}
                /> */}
              </div>
              <div style={{ padding: "1rem" }}>
                <p>
                <strong>Name: </strong> {portfolio?.personal_details.first_name}{" "}
                  {portfolio?.personal_details.last_name}
                </p>
                <p>
                <strong>Street: </strong>{portfolio?.personal_details.address.street}
                  {"\n"}
                </p>
                <p>
                <strong>City: </strong>{portfolio?.personal_details.address.city}
                  {"\n"}
                </p>

                <p><strong>Country: </strong>{portfolio?.personal_details.nationality}</p>

                {portfolio?.personal_details.skills.map((skill) => {
                  return <p><strong>Skills: </strong>{skill}</p>;
                })}
                <p><strong>Hourly rate: </strong>{portfolio?.hourly_rate} Euros / hour</p>
              </div>
            </div>

            <div className="professional-experience">
              <div className="portfoliobutton">
                <h6>
                  <strong>Professional Experience</strong>{" "}
                </h6>{" "}
                {/* <ExperienceAdd
                  id={portfolio?._id}
                  name={portfolio?.personal_details.first_name}
                  portfolio={portfolio}
                  setPortfolio={setPortfolio}
                /> */}
              </div>

              {portfolio?.experience.map((exp) => {
                return (
                  <div>
                    <ul>
                      <div className="experience">
                        <h6>
                          <strong>{exp?.position}</strong>
                        </h6>{" "}
                        {/* <div className="experience-item">
                          <ExperienceEdit
                            name={name}
                            id_exp={exp?._id}
                            institution={exp?.institution}
                            position={exp?.position}
                            from_date={exp?.from_date}
                            until_date={exp?.until_date}
                            setPortfolio={setPortfolio}
                          />

                          <IconButton aria-label="delete" size="small">
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
                                    `/portfolio/${portfolio?.personal_details?.first_name}/delete-experience`,
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
                        </div> */}
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
                <h6>
                  <strong>Qualification / Trainings</strong>
                </h6>{" "}
                {/* <EducationAdd
                  id={portfolio?._id}
                  name={portfolio?.personal_details.first_name}
                  portfolio={portfolio}
                  setPortfolio={setPortfolio}
                /> */}
              </div>

              {portfolio?.education.map((edu) => {
                return (
                  <div>
                    <ul>
                      <div className="experience">
                        <h6>
                          <strong>{edu?.degree}</strong>
                        </h6>{" "}
                        {/* <div className="experience-item">
                          <EducationEdit
                            name={name}
                            id_edu={edu?._id}
                            institute={edu?.institute}
                            degree={edu?.degree}
                            start_date={edu?.start_date}
                            end_date={edu?.end_date}
                            setPortfolio={setPortfolio}
                          />

                          <IconButton aria-label="delete" size="small">
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
                                    `/portfolio/${portfolio?.personal_details?.first_name}/delete-education`,
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
                        </div> */}
                      </div>
                      <div>
                        <h6>from {edu?.institute}</h6>{" "}
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
                <h6>
                  <strong>License / Certification</strong>
                </h6>{" "}
                {/* <CerticiationsAdd
                  id={portfolio?._id}
                  name={portfolio?.personal_details.first_name}
                  portfolio={portfolio}
                  setPortfolio={setPortfolio}
                /> */}
              </div>

              {portfolio?.certifications.map((cert) => {
                return (
                  <div>
                    <ul>
                      <div className="experience">
                        <h6>
                          <strong>{cert?.certification_name}</strong>
                        </h6>{" "}
                        {/* <div className="experience-item">
                          <CertificationEdit
                            name={name}
                            id_cert={cert?._id}
                            certification_name={cert?.certification_name}
                            valid_from={cert?.valid_from}
                            setPortfolio={setPortfolio}
                          />
                          <IconButton aria-label="delete" size="small">
                            <DeleteIcon
                              fontSize="inherit"
                              onClick={() => {
                                const certifications = {
                                  certifications: {
                                    certification_name:
                                      cert?.certification_name,
                                  },
                                };

                                console.log(certifications);
                                axios
                                  .put(
                                    `/portfolio/${portfolio?.personal_details?.first_name}/delete-certification`,
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
                        </div> */}
                      </div>
                      <div>
                        <h6 className="startandend">
                          Valid from{" "}
                          {moment(cert?.valid_from).format("MMM YYYY")}{" "}
                        </h6>{" "}
                      </div>
                    </ul>
                  </div>
                );
              })}
            </div>

            <div className="professional-experience">
              <div className="portfoliobutton">
                <h6>
                  <strong>Languages</strong>
                </h6>
                {/* <LanguagesAdd
                  id={portfolio?._id}
                  name={portfolio?.personal_details.first_name}
                  portfolio={portfolio}
                  setPortfolio={setPortfolio}
                /> */}
              </div>

              {portfolio?.languages.map((lang) => {
                return (
                  <div>
                    <ul>
                      <div className="experience">
                        <h6>
                          <strong>{lang?.language} </strong>
                        </h6>{" "}
                        {/* <div className="experience-item">
                          <LanguageEdit
                            name={name}
                            id_lang={lang?._id}
                            language={lang?.language}
                            proficiency={lang?.proficiency}
                            setPortfolio={setPortfolio}
                          />
                          <IconButton aria-label="delete" size="small">
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
                                    `/portfolio/${portfolio?.personal_details?.first_name}/delete-language`,
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
                        </div> */}
                      </div>
                      <div>
                        <h6 className="startandend">{lang?.proficiency}</h6>
                      </div>
                    </ul>
                  </div>
                );
              })}
            </div>
          </CardContent>
          {/* <CardActions
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button size="small" color="primary">
                    <NavLink to="/managebookings" className="button-expert">
                      MANAGE YOUR BOOKINGS
                    </NavLink>
                  </Button>
                </CardActions> */}
          </CardActionArea>
        </Card>
      </div>
        </div>
      ) : (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
}
