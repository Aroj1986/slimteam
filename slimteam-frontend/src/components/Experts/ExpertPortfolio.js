import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
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

// whenever we are using axios and getting data from the backend we need to use optional chaining to load the data in front-end other wise we get undefined value

export default function ExpertPortfolio({ setExpertName }) {
  const [expert, setExpert] = useState({});
  const { name } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:8888/explore-expert/${name}`)
      .then((res) => {
        setExpert(res.data);
        setExpertName(name);
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
        <div className="ex1">

        <div>
            <img className='profile-picture' src={expert.personal_details?.profile_picture} alt="Expert image"  style={{height: 150, width: 150}}/>
          </div>
          {/* <div className="main-card"> */}

          <Card className = "ex2">
            {/* <CardMedia className="profile-picture"
              component="img"
              alt="Expert image"
              height="140"
              // img className='profile-picture' src={expert.personal_details?.profile_picture} alt="Expert image"  style={{height: 150, width: 150}}/>
              
              image={expert.personal_details?.profile_picture}
            /> */}
            <CardContent >
              <Typography gutterBottom component="div">
                {expert.personal_details?.first_name}{" "}
                {expert.personal_details?.last_name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {expert.personal_details?.skills},{" "}
                {expert.personal_details?.nationality}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Message</Button>
              <Button size="small">
                <NavLink to={`/book-online/${name}`}>Book online</NavLink>
              </Button>
            </CardActions>
            <CardContent>
              <Typography gutterBottom component="div">
                <div className="professional-experience">
                  <h6>Professional experience</h6>
                  <div>
                    {expert?.experience?.length ? (
                      expert.experience.map((exp) => {
                        return (
                          <ul>
                            <li>Institution: {exp?.institution}</li>
                            <li>Position: {exp?.position}</li>
                          </ul>
                        );
                      })
                    ) : (
                      <p> No Experience Found</p>
                    )}
                  </div>
                </div>
              </Typography>
              <Typography gutterBottom component="div">
                <div className="professional-experience">
                  <h6>Education</h6>
                  <div>
                    {expert?.experience?.length ? (
                      expert.experience.map((exp) => {
                        return (
                          <ul>
                            <li>Institution: {exp?.institution}</li>
                            <li>Position: {exp?.position}</li>
                          </ul>
                        );
                      })
                    ) : (
                      <p> No Education Found</p>
                    )}
                  </div>
                </div>
              </Typography>
              <Typography gutterBottom component="div">
                <div className="professional-experience">
                  <h6>License / Certification</h6>
                  <p>
                    <div>
                      {expert?.certifications?.length ? (
                        expert.certifications.map((exp) => {
                          return (
                            <ul>
                              <li>certifications: {exp?.certification_name}</li>
                            </ul>
                          );
                        })
                      ) : (
                        <p> Certification Found</p>
                      )}
                    </div>
                  </p>
                </div>
              </Typography>

              <Typography gutterBottom component="div">
                <div className="professional-experience">
                  <h6>Languages</h6>

                  <div>
                    {expert?.languages?.length ? (
                      expert.languagues.map((exp) => {
                        return (
                          <ul>
                            <li>languages: {exp?.language}</li>
                            <li>languages: {exp?.proficiency}</li>
                          </ul>
                        );
                      })
                    ) : (
                      <p>No Languages Found</p>
                    )}
                  </div>
                </div>
              </Typography>
            </CardContent>
          </Card>
          </div>
          
        </div>
      {/* </div> */}
    </>
  );
}
