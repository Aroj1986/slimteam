import React from "react";
import "./profile.css";
import axios from "../../axiosClient";
import { useEffect, useState } from "react";
import ExperienceAdd from "./AddFunctionality/ExperienceAdd";
import EducationAdd from "./AddFunctionality/EducationAdd";
import CerticiationsAdd from "./AddFunctionality/CerticiationsAdd";
import LanguagesAdd from "./AddFunctionality/LanguagesAdd";
import UploadPic from "./UploadPic";
import moment from "moment";
import TimeCalculator from "./TimeCalculator";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import HeadlineEdit from "./EditFunctionality/HeadlineEdit";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import HeadlineEditExpert from "./EditFunctionality/HeadlineEditExpert";
import ExperienceEdit from "./EditFunctionality/ExperienceEdit";
import EducationEdit from "./EditFunctionality/EducationEdit";
import CertificationEdit from "./EditFunctionality/CertificationEdit";
import LanguageEdit from "./EditFunctionality/LanguageEdit";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { CardActionArea,CardActions } from "@mui/material";

export default function Portfolio({ name, email, setName }) {
  console.log(name)
  const [portfolio, setPortfolio] = useState();

  useEffect(() => {
    const getPortfolio = () => {
      axios
        .get(`/api/explore-experts/portfolio/${name}`)
        .then((res) => {
          setPortfolio(res.data);
          console.log(res.data)
        })
        .catch((err) => {
          console.log(`Error fetching sought expert in database: ${err}`);
        });
    };
    name && getPortfolio();
  }, [name]);

  return (
    <>
      {portfolio ? (
        <div>
          <div
        style={{
          // width: "100%",
          display: "flex",
          justifyContent: "center",
          paddingTop: "5rem",
          paddingBottom: "2rem",
          left: "20px",
        }}
      >
        <div className="upload">
          <div className="camerabutton">
            <UploadPic name={name} setPortfolio={setPortfolio} />
          </div>
          <img
            className="profile-picturee"
            src={portfolio?.personal_details.profile_picture}
            alt="Expert image"
            style={{
              // width: "100%",
              height: 150,
              width: 150
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
            width: "100%"
          }}
        >
          <CardActionArea>
          <CardContent>
            <div className="professional-experience">
              <div className="portfoliobutton"
              style={{ paddingLeft: "1rem" }}>
                <h6>
                  <strong>PERSONAL DETAILS</strong>
                </h6>
                {"\n"}
                    <HeadlineEditExpert
                      className="edit-function"
                      id_expert={portfolio?._id}
                      name={name}
                      first_name={portfolio?.personal_details.first_name}
                      last_name={portfolio?.personal_details.last_name}
                      skills={portfolio?.personal_details.skills}
                      street={portfolio?.personal_details.address.street}
                      city={portfolio?.personal_details.address.city}
                      nationality={portfolio?.personal_details.nationality}
                      hourly_rate={portfolio?.hourly_rate}
                      email={portfolio?.personal_details?.email}
                      phone_number={portfolio?.personal_details?.phone_number}
                      portfolio={portfolio}
                      setPortfolio={setPortfolio}
                      setName={setName}
                    />
                  </div>
                  <div style={{ paddingLeft: "2rem" }}>
                    <p>
                      <strong style={{color:"gray"}}>Name{" "}: {" "}
                      {portfolio?.personal_details.first_name.toUpperCase()}{" "}
                      {portfolio?.personal_details.last_name.toUpperCase()}</strong>
                    </p>
                    <p>
                      <strong style={{color:"gray"}}>Street{" "}: </strong>
                      {portfolio?.personal_details.address.street}
                      {"\n"}
                    </p>
                    <p>
                      <strong style={{color:"gray"}}>City{" "}: </strong>
                      {portfolio?.personal_details.address.city}
                      {"\n"}
                    </p>

                    <p>
                      <strong style={{color:"gray"}}>Country{" "}: </strong>
                      {portfolio?.personal_details.nationality}
                    </p>

                    {portfolio?.personal_details.skills.map((skill) => {
                      return (
                        <p>
                          <strong style={{color:"gray"}}>Skills{" "}: </strong>
                          {skill}
                        </p>
                      );
                    })}
                    <p>
                      <strong style={{color:"gray"}}>Hourly rate{" "}: </strong>
                      {portfolio?.hourly_rate} Euros / hour
                    </p>
                    <p>
                    <strong style={{color:"gray"}}>Phone number{" "}: </strong> {portfolio?.personal_details?.phone_number}{" "}
                    </p>
                    <p><strong style={{color:"gray"}}>E-Mail{" "}: </strong>{portfolio?.personal_details?.email}</p>
                  </div>
                </div>

                <div className="professional-experience">
                  <div className="portfoliobutton">
                    <h6  style={{ paddingLeft: "0.5rem" }}>
                      <strong>Experience</strong>{" "}
                    </h6>{" "}
                    <ExperienceAdd
                      id={portfolio?._id}
                      name={portfolio?.personal_details.first_name}
                      portfolio={portfolio}
                      setPortfolio={setPortfolio}
                    />
                  </div>

                  {portfolio?.experience.map((exp) => {
                    return (
                      <div>
                        <ul>
                          <div className="experience">
                            <h6>
                              <strong style={{color:"gray"}}>{exp?.position.toUpperCase()}</strong>
                            </h6>{" "}
                            <div className="experience-item">
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
                                        `/api/explore-experts/portfolio/${portfolio?.personal_details?.first_name}/delete-experience`,
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
                            <h6>at {exp?.institution.toUpperCase()}</h6>{" "}
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
                    <h6 style={{ paddingLeft: "0.5rem" }}>
                      <strong>Training</strong>
                    </h6>{" "}
                    <EducationAdd
                      id={portfolio?._id}
                      name={portfolio?.personal_details.first_name}
                      portfolio={portfolio}
                      setPortfolio={setPortfolio}
                    />
                  </div>

                  {portfolio?.education.map((edu) => {
                    return (
                      <div>
                        <ul>
                          <div className="experience">
                            <h6>
                              <strong style={{color:"gray"}}>{edu?.degree.toUpperCase()}</strong>
                            </h6>{" "}
                            <div className="experience-item">
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
                                        `/api/explore-experts/portfolio/${portfolio?.personal_details?.first_name}/delete-education`,
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
                          </div>
                          <div>
                            <h6>from {edu?.institute.toUpperCase()}</h6>{" "}
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
                    <h6 style={{ paddingLeft: "0.5rem" }}>
                      <strong >Licenses / Certifications</strong>
                    </h6>{" "}
                    <CerticiationsAdd
                      id={portfolio?._id}
                      name={portfolio?.personal_details.first_name}
                      portfolio={portfolio}
                      setPortfolio={setPortfolio}
                    />
                  </div>

                  {portfolio?.certifications.map((cert) => {
                    return (
                      <div>
                        <ul>
                          <div className="experience">
                            <h6>
                              <strong style={{color:"gray"}}>{cert?.certification_name.toUpperCase()}</strong>
                            </h6>{" "}
                            <div className="experience-item">
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
                                        `/api/explore-experts/portfolio/${portfolio?.personal_details?.first_name}/delete-certification`,
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
                    <h6 style={{ paddingLeft: "0.5rem" }}>
                      <strong>Languages</strong>
                    </h6>
                    <LanguagesAdd
                      id={portfolio?._id}
                      name={portfolio?.personal_details.first_name}
                      portfolio={portfolio}
                      setPortfolio={setPortfolio}
                    />
                  </div>

                  {portfolio?.languages.map((lang) => {
                    return (
                      <div>
                        <ul>
                          <div className="experience">
                            <h6>
                              <strong style={{color:"gray"}}>{lang?.language.toUpperCase()} </strong>
                            </h6>{" "}
                            <div className="experience-item">
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
                                        `/api/explore-experts/portfolio/${portfolio?.personal_details?.first_name}/delete-language`,
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
                          </div>
                          <div>
                            <h6 className="startandend">{lang?.proficiency.toUpperCase()}</h6>
                          </div>
                        </ul>
                      </div>
              )})}
            </div>
          </CardContent>
          <CardActions
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button size="small" color="primary">
                    <NavLink to={`/manageexpertbookings/${portfolio?.personal_details.first_name}`} className="button-expert">
                      MANAGE YOUR BOOKINGS
                    </NavLink>
                  </Button>
                </CardActions>
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