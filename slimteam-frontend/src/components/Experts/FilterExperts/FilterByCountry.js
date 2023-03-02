import * as React from "react";
import { Button, CardActionArea, CardActions } from "@mui/material";
import "./filter.css";
import { useState } from "react";
import {
  Box,
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

export default function FilterByCountry({
  experts,
  setSortedExpertsByCountry,
  checkedCountry,
  setCheckedCountry,
  selected,
}) {
  // filter checkbox
  let result = checkedCountry.filter((count) => count.checked);

  const handleChange = (checked, i) => {
    let tmp = checkedCountry[i];
    tmp.checked = !checked;
    let CheckedCountriesClone = [...checkedCountry];
    CheckedCountriesClone[i] = tmp;
    setCheckedCountry([...CheckedCountriesClone]);
    setSortedExpertsByCountry(experts);
  };

  selected = result.map((rec) => rec.count);

  function handleSubmit(e) {
    e.preventDefault();
    setSortedExpertsByCountry(
      experts.filter(
        (expert) =>
          expert?.personal_details?.nationality?.toLowerCase() === selected[0]
      )
    );
  }

  console.log(selected[0]);

  return (
    <div className="filter-card-container">
      <Box sx={{ display: "flex" }}>
        <FormControl component="fieldset" variant="standard">
          <FormLabel component="legend" className="country">Country</FormLabel>
          <FormGroup>
            {checkedCountry.map(({ count, checked }, i) => (
              <div key={i}>
                <input
                  type="checkbox"
                  id={i}
                  checked={checked}
                  onChange={() => handleChange(checked, i)}
                />
                <label className="form-check-label" htmlFor={i}>
                  {count}
                </label>
              </div>
            ))}

            <Button
              size="small"
              onClick={handleSubmit}
              style={{ color: "white" }}
            >
              <a className="button-expert">Filter</a>
            </Button>
          </FormGroup>
        </FormControl>
      </Box>
    </div>
  );
}
