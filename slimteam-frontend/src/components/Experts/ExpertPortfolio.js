import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Calender from "../Calender/Calender";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./experts.css";
import { AuthContext } from "../../context/AuthProvider";

export default function ExpertPortfolio({ setExpertName }) {
  const { user } = useContext(AuthContext);
  const [expert, setExpert] = useState({});
  const { name } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:8888/explore-expert/${name}`)
      .then((res) => {
        setExpert(res.data);
        setExpertName(name);
        localStorage.setItem("expertName", name);
      })
      .catch((err) => {
        console.log(`Error fetching sought expert in database: ${err}`);
      });
  }, [name]);
  console.log(expert);

  return (
    <>
      <button onClick={() => navigate(-1)} className="goBackArrow">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="gray"
            className="bi bi-skip-backward-btn "
            viewBox="0 0 16 16"
          >
            <path d="M11.21 5.093A.5.5 0 0 1 12 5.5v5a.5.5 0 0 1-.79.407L8.5 8.972V10.5a.5.5 0 0 1-.79.407L5 8.972V10.5a.5.5 0 0 1-1 0v-5a.5.5 0 0 1 1 0v1.528l2.71-1.935a.5.5 0 0 1 .79.407v1.528l2.71-1.935z" />
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
          </svg>
        </span>
        <span className="goBackText">Back to all experts</span>
      </button>

      <div className="expert">
        {/* <div className="ex1"> */}
          <div>
            <img
              className="profile-picture"
              src={expert?.personal_details?.profile_picture}
              alt="Expert image"
              style={{ height: 150, width: 150 }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              margin: "0 auto",
              marginBottom: "5rem",
            }}
          >
            <Card
              style={{
                backgroundColor: " rgba(255,250,250)",
                padding: "0rem",
                width: "42%",
                borderRadius: "1rem",
              }}
            >
              <CardContent style={{ padding: "0px", paddingTop: "16px" }}>
                <Typography gutterBottom component="div">
                  <h4>
                    {expert.personal_details?.first_name}{" "}
                    {expert.personal_details?.last_name}
                  </h4>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <b>
                    {expert.personal_details?.address?.city},{" "}
                    {expert.personal_details?.nationality}
                  </b>
                </Typography>
                <Typography>
                  {expert?.personal_details?.skills?.length ? (
                    expert.personal_details.skills.map((skill) => {
                      return <>{skill} </>;
                    })
                  ) : (
                    <p className="heading2"> No SkillsFound</p>
                  )}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {expert.personal_details?.email}{" "}
                </Typography>
                <Typography>{expert.personal_details?.phone_number}</Typography>
                <Typography variant="body2" color="text.secondary">
                  <p>Hourly Rate: {expert?.hourly_rate}/€</p>
                </Typography>
              </CardContent>
              <CardActions style={{ justifyContent: "center" }}>
                <Button
                  size="small"
                  className="button-expert"
                  style={{ color: "white" }}
                >
                  <button onClick={() => window.location = `mailto:${expert?.personal_details?.email}`} className="button-expert" >
                  E-MAIL
                </button>
                </Button>
                <Button
                  size="small"
                  className="button-expert"
                  style={{ color: "white" }}
                >
                  <NavLink
                    to={`/book-online/${name}`}
                    className="button-expert"
                  >
                    Book online
                  </NavLink>
                </Button>
              </CardActions>
              <CardContent>
                <Typography gutterBottom component="div">
                  <div className="professional-experience">
                    <div>
                      <h5
                        className="heading"
                        style={{ paddingLeft: "1rem", paddingTop: "1rem" }}
                      >
                        Experience
                      </h5>
                      {expert?.experience?.length ? (
                        expert?.experience.map((exp) => {
                          return (
                            <ul className="my-list heading">
                              <li>Institution: {exp?.institution}</li>
                              <li>Position: {exp?.position}</li>
                            </ul>
                          );
                        })
                      ) : (
                        <p className="heading2"> No Experience Found</p>
                      )}
                    </div>
                  </div>
                </Typography>
                <Typography gutterBottom component="div">
                  <div className="professional-experience">
                    <h5
                      className="heading"
                      style={{ paddingLeft: "1rem", paddingTop: "1rem" }}
                    >
                      Education
                    </h5>
                    <div>
                      {expert?.education?.length ? (
                        expert?.education.map((exp) => {
                          return (
                            <ul className="my-list heading">
                              <li>Institute: {exp?.institute}</li>
                              <li>Degree: {exp?.degree}</li>
                            </ul>
                          );
                        })
                      ) : (
                        <p className="heading2"> No Education Found</p>
                      )}
                    </div>
                  </div>
                </Typography>
                <Typography gutterBottom component="div">
                  <div className="professional-experience">
                    <h5
                      className="heading"
                      style={{ paddingLeft: "1rem", paddingTop: "1rem" }}
                    >
                      License / Certification
                    </h5>
                    <p>
                      <div>
                        {expert?.certifications?.length ? (
                          expert?.certifications.map((exp) => {
                            return (
                              <ul className="my-list heading">
                                <li>
                                  certifications: {exp?.certification_name}
                                </li>
                              </ul>
                            );
                          })
                        ) : (
                          <p className="heading2"> Certification Found</p>
                        )}
                      </div>
                    </p>
                  </div>
                </Typography>

                                <Typography gutterBottom component="div">

                  <div className="professional-experience">
                    <h5 className="heading"  style={{ paddingLeft: "1rem", paddingTop: "1rem" }}>Languages</h5>

                    <div>
                      {expert?.languages?.length ? (
                        expert.languages.map((exp) => {
                          return (
                            <ul className="my-list heading">
                              <li>languages: {exp?.language}</li>
                              <li>languages: {exp?.proficiency}</li>
                            </ul>
                          );
                        })
                      ) : (
                        <p className="heading2"> No Languages Found</p>
                      )}
                    </div>
                  </div>
                </Typography>
              </CardContent>
            </Card>
          </div>
        {/* </div> */}
      </div>
      {/* </div> */}
    </>
  );
}
