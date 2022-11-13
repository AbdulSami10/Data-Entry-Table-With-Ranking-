//Abdul Sami
import React from "react";
import "./searchBar.css";
import { BiSearchAlt } from "react-icons/bi";
const SearchBar = () => {
  return (
    <div>
      <div>
        <div className="searchbar-box">
          <input type="searchbox" placeholder="Search for items and brands" />
          <span className="searchbar-icon">
            <BiSearchAlt />
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
