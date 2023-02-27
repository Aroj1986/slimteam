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

export default function FilterByCountry({ experts, sortedExpertsByCountry, setSortedExpertsByCountry }) {
  const [isCountryChecked, setIsCountryChecked] = useState(false);
  const [prevCountryChecked, setPrevCountryChecked] = useState(false);

  // filter checkbox
  const filterExperts = (value) => {
    if (value) {
      setSortedExpertsByCountry(
        experts.filter(
          (expert) =>
            expert?.personal_details?.nationality?.toLowerCase() === "germany"
        )
      );
      console.log(value);
    } else {
      setSortedExpertsByCountry(experts);
      console.log(value);
    }
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setPrevCountryChecked(isCountryChecked); // Store the previous value
    setIsCountryChecked(isChecked); // Update the current value

    // Call the filter function with the previous value
    filterExperts(e.target.checked);
  };

  console.log(sortedExpertsByCountry);

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
