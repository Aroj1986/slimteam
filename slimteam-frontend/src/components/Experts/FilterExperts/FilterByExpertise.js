import * as React from "react";
import { Box, FormLabel, FormControl, FormGroup } from "@mui/material";
import "../experts.css";

export default function FilterByExpertise({
  experts,
  setSortedExpertsByExpertise,
  checkedExpertise,
  setCheckedExpertise,
  selected,
}) {
  // filter checkbox
  let result = checkedExpertise.filter((expertise) => expertise.checked);

  const handleChange = (checked, i) => {
    setCheckedExpertise(false);
    let tmp = checkedExpertise[i];
    tmp.checked = !checked;
    let checkedExpertiseClone = [...checkedExpertise];
    checkedExpertiseClone[i] = tmp;
    console.log(checkedExpertiseClone);
    setCheckedExpertise([...checkedExpertiseClone]);
    if (tmp.checked === false) {
      setSortedExpertsByExpertise(false);
    } else {
      setSortedExpertsByExpertise(
        experts.filter((expert) => {
          for (let i = 0; i < expert.personal_details.skills.length; i++) {
            console.log(expert.personal_details.skills[i]);
            console.log(tmp.expertise[expert.personal_details.skills[i]]);
            console.log(tmp.expertise);
            if (
              expert.personal_details.skills[i]
                .toLowerCase()
                .includes(tmp.expertise.toLowerCase())
            ) {
              return true;
            } else {
              return false;
            }
          }
        })
      );
      console.log(tmp);
    }
    console.log(tmp);
    console.log(checkedExpertiseClone);
  };

  selected = result.map((rec) => rec.expertise);

  return (
    <div className="filter-card-container">
      <Box sx={{ display: "flex" }}>
        <FormControl component="fieldset" variant="standard">
          <FormLabel component="legend">Expertise</FormLabel>
          <FormGroup className="checkbox-label">
            {checkedExpertise.map(({ expertise, checked }, i) => (
              <div key={i}>
                <input
                  type="checkbox"
                  id={i}
                  checked={checked}
                  onChange={() => handleChange(checked, i)}
                />
                <label className="form-check-label" htmlFor={i}>
                  {expertise
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
