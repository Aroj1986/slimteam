import React, { useState } from "react";

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
    </div>
  );
}

export default SearchExpert;
