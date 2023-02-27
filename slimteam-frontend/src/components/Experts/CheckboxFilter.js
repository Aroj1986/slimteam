import * as React from "react";
import { useState } from "react";
import {
  Box,
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

export default function CheckboxFilter({ experts, setExperts }) {

  console.log(experts);
  
  const [isCountryChecked, setIsCountryChecked] = useState(false);
  const [prevCountryChecked, setPrevCountryChecked] = useState(false);
  const [sortedExpertsByCountry, setSortedExpertsByCountry] = useState(experts);

  // filter checkbox
  const filterExperts = (value) => {
    console.log(value)
    if (value) {
      setSortedExpertsByCountry(
        experts.filter(
          (expert) =>
            expert?.personal_details?.nationality?.toLowerCase() === "germany"
        )
      );
      console.log(isCountryChecked);
    } if(!value) {
      setSortedExpertsByCountry(experts);
      console.log(isCountryChecked);
    }
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setPrevCountryChecked(isCountryChecked); // Store the previous value
    setIsCountryChecked(isChecked); // Update the current value

    // Call the filter function with the previous value
    filterExperts(e.target.checked);
  };
  
  return (
    <div className="filter-card-container">
      <Box sx={{ display: "flex" }}>
        <FormControl component="fieldset" variant="standard">
          <FormLabel component="legend">Country</FormLabel>
          <FormGroup>
            <FormControlLabel
              label="Germany"
              control={
    <Checkbox
      checked={isCountryChecked}
      onChange={handleCheckboxChange}
      size="small"
      color="success"
    />
              }
            />
          </FormGroup>
        </FormControl>
      </Box>
    </div>
  );
}
