import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./experts.css";
import { useNavigate } from "react-router-dom";
//import CheckboxFilter from "./CheckboxFilter";
import {
  Box,
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

export default function ExploreExperts({ experts, setExperts }) {

  const [expertSearchText, setExpertSearchText] = useState();
  const [soughtExperts, setSoughtExperts] = useState();
  const [countryIsChecked, setCountryIsChecked] = useState(false);
  const [sortedExpertsByCountry, setSortedExpertsByCountry] = useState(experts);
  const navigate = useNavigate();

  // search button
  const handleOnChangeSearch = (e) => {
    setExpertSearchText(e.target.value);
  };

  const handleOnClickSearch = () => {
    setSoughtExperts(
      experts.filter(
        (expert) =>
          expert?.personal_details?.first_name?.toLowerCase() ===
            expertSearchText ||
          expert?.personal_details?.last_name?.toLowerCase() ===
            expertSearchText ||
          expert?.personal_details?.nationality?.toLowerCase() ===
            expertSearchText
      )
    );
    setExpertSearchText("");
  };

  const handleOnKeySearch = (e) => {
    if (e.key === "Enter") {
      handleOnClickSearch();
    }
  };

  // filter checkbox
  const filterExperts = (value) => {
    if (value) {
      setSortedExpertsByCountry(
        experts.filter(
          (expert) =>
            expert?.personal_details?.nationality?.toLowerCase() === "germany"
        )
      );
    } else {
      setSortedExpertsByCountry(experts);
    }
  };

  return (
    <>
      <h3 style={{ paddingLeft: "2rem" }}>
        Discover SlimTeam experts at your location
      </h3>
      <div className="container-search-field">
        <input
          type="text"
          placeholder={"SlimTeam expert"}
          value={expertSearchText}
          onChange={handleOnChangeSearch}
          onKeyDown={handleOnKeySearch}
        ></input>
        <button className="button-expert" onClick={handleOnClickSearch}>
          Search
        </button>
      </div>

      <hr />

      <div className="row">
        <div className="col col-3 d-flex flex-column justify-content-start">
          <div className="filter-container">
            <h6>
              <b>
                <u>Filter your search results:</u>
              </b>
            </h6>
            <div className="filter-card-container">
              {/* <CheckboxFilter country={country} setCountry={setCountry} /> */}
              <Box sx={{ display: "flex" }}>
                <FormControl component="fieldset" variant="standard">
                  <FormLabel component="legend">Country</FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      label="Germany"
                      control={
                        <Checkbox
                          checked={countryIsChecked}
                          onChange={(e) => {
                            setCountryIsChecked(e.target.checked);
                            filterExperts(e.target.checked);
                          }}
                          size="small"
                          color="success"
                        />
                      }
                    />
                  </FormGroup>
                </FormControl>
              </Box>
            </div>
          </div>
        </div>

        <div className="col col-9">
          {experts.length ? (
            <div>
              {soughtExperts ? (
                <div>
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
                    <span className="goBackText">Back to all experts</span>
                  </button>

                  <div className="expert-list-container">
                    {soughtExperts.map((expert, index) => (
                      <div className="card-container" key={index}>
                        <img
                          src={expert.personal_details.profile_picture}
                          alt="Expert image"
                          style={{ height: 100, width: 100 }}
                        />
                        <p className="card-name">
                          <b>
                            {expert.personal_details.first_name}{" "}
                            {expert.personal_details.last_name}
                          </b>
                        </p>
                        <p className="card-expertise">
                          {expert.personal_details.skills}
                        </p>
                        <button className="button-expert">
                          <NavLink
                            to={`/explore-experts/${expert.personal_details.first_name}`}
                            className="button-expert"
                          >
                            view details
                          </NavLink>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="expert-list-container">
                  {experts.map((expert, index) => (
                    <div className="card-container" key={index}>
                      <img
                        src={expert.personal_details.profile_picture}
                        alt="Expert image"
                        style={{ height: 100, width: 100 }}
                      />
                      <p className="card-name">
                        <b>
                          {expert.personal_details.first_name}{" "}
                          {expert.personal_details.last_name}
                        </b>
                      </p>
                      <p className="card-expertise">
                        {expert.personal_details.skills}
                      </p>
                      <button className="button-expert">
                        <NavLink
                          to={`/explore-experts/${expert.personal_details.first_name}`}
                          className="button-expert"
                        >
                          view details
                        </NavLink>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="nosearchresultstext">
                <p>No search results, Try again!! </p>
              </div>

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
                <span className="goBackText">Back to all experts</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="expert-list-container">
        {sortedExpertsByCountry.map((expert, index) => (
          <div className="card-container" key={index}>
            <img
              src={expert.personal_details.profile_picture}
              alt="Expert image"
              style={{ height: 100, width: 100 }}
            />
            <p className="card-name">
              <b>
                {expert.personal_details.first_name}{" "}
                {expert.personal_details.last_name}
              </b>
            </p>
            <p className="card-expertise">{expert.personal_details.skills}</p>
            <button className="button-expert">
              <NavLink
                to={`/explore-experts/${expert.personal_details.first_name}`}
                className="button-expert"
              >
                view details
              </NavLink>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
