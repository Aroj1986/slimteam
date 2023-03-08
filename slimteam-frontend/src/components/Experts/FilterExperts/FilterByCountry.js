import * as React from "react";
import "./filter.css";
import { Box, FormLabel, FormControl, FormGroup } from "@mui/material";
import "../experts.css";

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
    setCheckedCountry(false);
    let tmp = checkedCountry[i];
    tmp.checked = !checked;
    let CheckedCountriesClone = [...checkedCountry];
    CheckedCountriesClone[i] = tmp;

    setCheckedCountry([...CheckedCountriesClone]);

    if (tmp.checked === false) {
      setSortedExpertsByCountry(false);
    } else {
      setSortedExpertsByCountry(
        experts.filter(
          (expert) =>
            expert?.personal_details?.nationality?.toLowerCase() === tmp.count
        )
      );
    }
  };

  selected = result.map((rec) => rec.count);

  return (
    <div className="filter-card-container">
      <Box sx={{ display: "flex" }}>
        <FormControl component="fieldset" variant="standard">
          <FormLabel component="legend" className="country">
            Country
          </FormLabel>

          <FormGroup className="checkbox-label">
            {checkedCountry.map(({ count, checked }, i) => (
              <div key={i}>
                <input
                  type="checkbox"
                  id={i}
                  checked={checked}
                  onChange={() => handleChange(checked, i)}
                />
                <label className="form-check-label" htmlFor={i}>
                  {count
                    .toLowerCase()
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </label>
              </div>
            ))}
          </FormGroup>
        </FormControl>
      </Box>
    </div>
  );
}
