import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function Search() {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchValue.trim() === "") {
      alert("Không được để trống");
    } else {
      // You can perform any further actions with the validated search value here
      console.log("Search term:", searchValue);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>Live Search: React Application</label> <br />
      <input
        type="text"
        name="search"
        className="search"
        value={searchValue}
        onChange={handleInputChange}
        placeholder="Search..."
      />
    </form>
  );
}

export default Search;
