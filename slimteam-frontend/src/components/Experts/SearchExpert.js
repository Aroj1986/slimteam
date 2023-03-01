import React, { useState } from "react";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "./experts.css";

function SearchExpert({ experts, setExperts }) {

    const [expertSearchText, setExpertSearchText] = useState();

  // search button
  const handleOnChangeSearch = (e) => {
    setExpertSearchText(e.target.value);
  };

  const handleOnClickSearch = () => {
    setExperts(
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
  return (
    <div>
      <h6 style={{ paddingLeft: "0rem" }}>
        Discover Experts at your location
      </h6>
      <div className="container-search-field">

      <TextField  sx={{ input: {color: 'black' } }}id="filled-basic" label="SlimTeam expert" variant="filled" 
          value={expertSearchText}
          onChange={handleOnChangeSearch}
          onKeyDown={handleOnKeySearch}  />
        
        <Button size="small"  onClick={handleOnClickSearch} style={{color: "white"}}>
         <a className="button-expert">Search</a> 
        </Button>
      </div>
    </div>
  );
}

export default SearchExpert;
