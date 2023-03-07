import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./experts.css";
import { useNavigate } from "react-router-dom";
import FilterByCountry from "./FilterExperts/FilterByCountry";
import SearchExpert from "./SearchExpert";
import FilterByExpertise from "./FilterExperts/FilterByExpertise";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

export default function ExploreExperts({ experts, setExperts }) {

  const { loading } = useContext(AuthContext);

  // sort by country
  const [checkedCountry, setCheckedCountry] = useState([
    { count: "germany", checked: false },
    { count: "england", checked: false },
  ]);
  const [prevCountryChecked, setPrevCountryChecked] = useState(false);
  const [sortedExpertsByCountry, setSortedExpertsByCountry] = useState(false);

  // sort by expertise
  const [checkedExpertise, setCheckedExpertise] = useState([
    { expertise: "cooking", checked: false },
    { expertise: "carpenter", checked: false },
    { expertise: "gardener", checked: false },
    { expertise: "plumbing", checked: false },
    { expertise: "nanny", checked: false },
    { expertise: "cleaner", checked: false },
  ]);
  const [sortedExpertsByExpertise, setSortedExpertsByExpertise] =
    useState(false);

  const navigate = useNavigate();

  let selected = [];

  console.log(sortedExpertsByCountry);
  console.log(sortedExpertsByExpertise);

  // to capitalize first letter of the word
  function capitalizeWords(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const [showLoadMore, setShowLoadMore] = useState(false);
  const [visibleExperts, setVisibleExperts] = useState(4);

  const loadMore = () => {
    setVisibleExperts((prev) => prev + 4);
  };

  // console.log(
  //   experts.length >= 4,
  //   sortedExpertsByCountry.length >= 4,
  //   sortedExpertsByExpertise.length >= 4
  // );
  return (
    <>
      <div className="row backgroundBody">
        <div className="col col-3 d-flex flex-column justify-content-start">
          <div className="filter-container">
            <h6>
              <>
                <SearchExpert experts={experts} setExperts={setExperts} />
                <h5>Filter your results:</h5>
              </>
            </h6>
            <div className="filter-card-container">
              <FilterByCountry
                experts={experts}
                sortedExpertsByCountry={sortedExpertsByCountry}
                setSortedExpertsByCountry={setSortedExpertsByCountry}
                checkedCountry={checkedCountry}
                setCheckedCountry={setCheckedCountry}
                prevCountryChecked={prevCountryChecked}
                setPrevCountryChecked={setPrevCountryChecked}
                selected={selected}
              />
              <FilterByExpertise
                experts={experts}
                setSortedExpertsByExpertise={setSortedExpertsByExpertise}
                checkedExpertise={checkedExpertise}
                setCheckedExpertise={setCheckedExpertise}
                selected={selected}
              />
            </div>
          </div>
        </div>

        {!loading && (
        <div className="col col-9 fullcontainer">
          <button onClick={() => navigate(0)} className="goBackArrow">
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
            <span className="goBackText"></span>
          </button>
          {experts.length ? (
            <div>
              {sortedExpertsByCountry.length ? (
                <div>
                  <div className="expert-list-container">
                    {sortedExpertsByCountry
                      .slice(0, visibleExperts)
                      .map((expert, index) => (
                        <Card
                          className="cardpoke"
                          border="primary"
                          style={{ width: "15rem", height: "22rem" }}
                        >
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              height="200"
                              image={expert.personal_details.profile_picture}
                              alt="Expert image"
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                              >
                                <h6 className="explore-experts-name-skills">
                                  {expert.personal_details?.first_name?.toUpperCase()}{" "}
                                  {expert.personal_details?.last_name?.toUpperCase()}
                                </h6>
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                className="explore-experts-name-skills"
                              >
                                {expert.personal_details.skills}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                          <CardActions className="button-div">
                            <Button size="small" color="primary">
                              <NavLink
                                to={`/explore-experts/${expert?.personal_details.first_name}`}
                                className="button-expert"
                              >
                                view details
                              </NavLink>
                            </Button>
                          </CardActions>
                        </Card>
                      ))}
                  </div>
                  {sortedExpertsByCountry.length >= 4 && (
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "black",
                        display: "flex",
                        alignItems: "center",
                        margin: "0 auto",
                        marginTop: "2rem",
                        marginBottom: "1rem"

                      }}
                      onClick={loadMore}
                    >
                      Load more
                    </Button>
                  )}
                </div>
              ) : (
                <div>
                  {sortedExpertsByExpertise.length ? (
                    <div>
                      <div className="expert-list-container">
                        {sortedExpertsByExpertise
                          .slice(0, visibleExperts)
                          .map((expert, index) => (
                            <Card
                              className="cardpoke"
                              border="primary"
                              style={{ width: "15rem", height: "22rem" }}
                            >
                              <CardActionArea>
                                <CardMedia
                                  component="img"
                                  height="200"
                                  image={
                                    expert.personal_details.profile_picture
                                  }
                                  alt="Expert image"
                                />
                                <CardContent>
                                  <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                  >
                                    <h6 className="explore-experts-name-skills">
                                      {expert.personal_details?.first_name?.toUpperCase()}{" "}
                                      {expert.personal_details?.last_name?.toUpperCase()}
                                    </h6>
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    className="explore-experts-name-skills"
                                  >
                                    {expert.personal_details.skills}
                                  </Typography>
                                </CardContent>
                              </CardActionArea>
                              <CardActions className="button-div">
                                <Button size="small" color="primary">
                                  <NavLink
                                    to={`/explore-experts/${expert.personal_details.first_name}`}
                                    className="button-expert"
                                  >
                                    view details
                                  </NavLink>
                                </Button>
                              </CardActions>
                            </Card>
                          ))}
                      </div>
                      {sortedExpertsByExpertise.length >= 4 && (
                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: "black",
                            display: "flex",
                            alignItems: "center",
                            margin: "0 auto",
                            marginTop: "2rem",
                            marginBottom: "1rem"

                          }}
                          onClick={loadMore}
                        >
                          Load more
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="expert-list-container">
                      {experts.slice(0, visibleExperts).map((expert, index) => (
                        <Card
                          className="cardpoke"
                          border="primary"
                          style={{ width: "15rem", height: "22rem" }}
                        >
                          {" "}
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              height="200"
                              image={expert.personal_details.profile_picture}
                              alt="Expert image"
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                              >
                                <h6 className="explore-experts-name-skills">
                                  {expert.personal_details?.first_name?.toUpperCase()}{" "}
                                  {expert.personal_details?.last_name?.toUpperCase()}
                                </h6>
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                className="explore-experts-name-skills"
                              >
                                {expert.personal_details.skills}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                          <CardActions className="button-div">
                            <Button size="small" color="primary">
                              <NavLink
                                to={`/explore-experts/${expert.personal_details.first_name}`}
                                className="button-expert"
                              >
                                view details
                              </NavLink>
                            </Button>
                          </CardActions>
                        </Card>
                      ))}
                    </div>
                  )}
                  {experts.length >= 4 && (
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "black",
                        display: "flex",
                        alignItems: "center",
                        margin: "0 auto",
                        marginTop: "2rem",
                        marginBottom: "1rem"
                      }}
                      onClick={loadMore}
                    >
                      Load more
                    </Button>
                  )}{" "}
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="no-search-text">
                <p>Nothing found, Try searching again </p>
              </div>
            </div>
          )}
        </div>
)}
      </div>
    </>
  );
}
