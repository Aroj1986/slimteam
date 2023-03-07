import React from "react";
import axios from "../../axiosClient";
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
      .get(`/explore-expert/${name}`)
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
                    {expert.personal_details?.first_name.toUpperCase()}{" "}
                    {expert.personal_details?.last_name.toUpperCase()}
                  </h4>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <b>
                    {expert.personal_details?.address?.city.toUpperCase()},{" "}
                    {expert.personal_details?.nationality.toUpperCase()}
                  </b>
                </Typography>
                <Typography>
                  {expert?.personal_details?.skills?.length ? (
                    expert.personal_details.skills.map((skill) => {
                      return <>{skill.toUpperCase()} </>;
                    })
                  ) : (
                    <p className="heading2"> No SkillsFound</p>
                  )}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {expert.personal_details?.email.toUpperCase()}{" "}
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
                        EXPERIENCE
                      </h5>
                      {expert?.experience?.length ? (
                        expert?.experience.map((exp) => {
                          return (
                            <ul className="my-list heading">
                              <li><strong style={{color:"gray",paddingTop:"2rem"}} >INSTITUTION </strong>: {exp?.institution.toUpperCase()}</li>
                              <li><strong style={{color:"gray",paddingTop:"2rem"}} >POSITION </strong>: {exp?.position.toUpperCase()}</li>
                            </ul>
                          );
                        })
                      ) : (
                        <p className="heading2"> NO EXPERIENCE FOUND</p>
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
                      TRAININGS
                    </h5>
                    <div>
                      {expert?.education?.length ? (
                        expert?.education.map((exp) => {
                          return (
                            <ul className="my-list heading">
                              <li><strong style={{color:"gray",paddingTop:"2rem"}} >INSTITUTE </strong>: {exp?.institute.toUpperCase()}</li>
                              <li><strong style={{color:"gray",paddingTop:"2rem"}} >DEGREE</strong> : {exp?.degree.toUpperCase()}</li>
                            </ul>
                          );
                        })
                      ) : (
                        <p className="heading2">NO EDUCATION FOUND</p>
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
                      LICENCES / CERTIFICATIONS
                    </h5>
                    <p>
                      <div>
                        {expert?.certifications?.length ? (
                          expert?.certifications.map((exp) => {
                            return (
                              <ul className="my-list heading">
                                <li>
                                <strong style={{color:"gray",paddingTop:"2rem"}} >{exp?.certification_name.toUpperCase()}</strong>
                                </li>
                              </ul>
                            );
                          })
                        ) : (
                          <p className="heading2">NO CERTIFICATIONS OR LICENCES </p>
                        )}
                      </div>
                    </p>
                  </div>
                </Typography>

                                <Typography gutterBottom component="div">

                  <div className="professional-experience">
                    <h5 className="heading"  style={{ paddingLeft: "1rem", paddingTop: "1rem" }}>LANGUAGES</h5>

                    <div>
                      {expert?.languages?.length ? (
                        expert.languages.map((exp) => {
                          return (
                            <ul className="my-list heading">
                              <li> <strong style={{color:"gray",paddingTop:"2rem"}} >{exp?.language.toUpperCase()}</strong></li>
                              <li style={{paddingLeft:"1rem" , paddingTop:"0.4rem"}}> {exp?.proficiency.toUpperCase()}</li>
                            </ul>
                          );
                        })
                      ) : (
                        <p className="heading2"> NO LANGUAGES FOUND</p>
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
