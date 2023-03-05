import React from "react";
import Container from "react-bootstrap/Container";
import "../profile.css";
import axios from "axios";
import { useEffect, useState } from "react";
import UploadPic from "../UploadPic";
import HeadlineEdit from "../EditFunctionality/HeadlineEdit";
import { NavLink } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { height, maxHeight } from "@mui/system";

export default function Portfolio_user({ name, email, setName }) {
  const [portfolio, setPortfolio] = useState();

  useEffect(() => {
    const getPortfolio = () => {
      axios
        .get(`http://localhost:8888/portfolio/${name}`)
        .then((res) => {
          setPortfolio(res.data);
        })
        .catch((err) => {
          console.log(`Error fetching sought expert in database: ${err}`);
        });
    };
    name && getPortfolio();
  }, [name]);

  return (
    <Container>
      {portfolio ? (
        <div className="expert-portfolio">
          <div className="expert-description-container">
            <div className="upload">
              <div className="camerabutton">
                <UploadPic name={name} />
              </div>
              <img
                className="profile-picturee"
                src={portfolio?.personal_details.profile_picture}
                alt="Expert image"
                style={{ height: 150, width: 150 }}
              />
            </div>
            <Card
              style={{
                backgroundColor: " rgba(255,250,250)",
                padding: "0rem",
                width: "272%",
                borderRadius: "1rem",
              }}
            >
              <CardActionArea>
                <CardContent>
                  <div className="professional-experience" style={{paddingLeft: "1rem", margin: "1rem"}}>
                    <div className="portfoliobutton">
                      <h6>
                        <strong>Personal Details</strong>
                      </h6>
                      {"\n"}
                      <HeadlineEdit
                        className="edit-function"
                        id_expert={portfolio?._id}
                        name={name}
                        first_name={portfolio?.personal_details?.first_name}
                        last_name={portfolio?.personal_details?.last_name}
                        street={portfolio?.personal_details?.address?.street}
                        city={portfolio?.personal_details?.address?.city}
                        nationality={portfolio?.personal_details?.nationality}
                        email={portfolio?.personal_details?.email}
                        phone_number={portfolio?.personal_details?.phone_number}
                        portfolio={portfolio}
                        setPortfolio={setPortfolio}
                        setName={setName}
                      />
                    </div>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="left"
                  >
                    <h6>
                      {" "}
                      Name:
                      <b>
                        {portfolio?.personal_details?.first_name}{" "}
                        {portfolio?.personal_details?.last_name}
                      </b>
                    </h6>
                  </Typography>
                  
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="left"
                  >
                    <h6>
                      Address: {portfolio?.personal_details?.address?.street}{" "}
                    </h6>
                    <h6>City: {portfolio?.personal_details?.address?.city}</h6>
                    <h6>Country: {portfolio?.personal_details?.nationality}</h6>
                    <h6>E-Mail: {portfolio?.personal_details?.email} </h6>
                    <h6>
                      Phone number: {portfolio?.personal_details?.phone_number}{" "}
                    </h6>
                  </Typography>
                  </div>


                </CardContent>

                <CardActions
                  style={{ display: "flex", justifyContent: "center" }}
                ></CardActions>
              </CardActionArea>
            </Card>
          </div>
        </div>
      ) : (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
}
