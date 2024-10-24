import React, { useState } from 'react';
import './Search.css'; // Make sure to create this CSS file

const Search = () => {
  const [searchType, setSearchType] = useState(null);

  const handleSearchByName = () => {
    setSearchType('name');
  };

  const handleSearchBySkills = () => {
    setSearchType('skills');
  };

  return (
    <div className="search-container">
      <div className="button-group">
        <button className="search-button" onClick={handleSearchByName}>
          Search by Name
        </button>
        <button className="search-button" onClick={handleSearchBySkills}>
          Search by Skills
        </button>
      </div>
      {searchType === 'name' && (
        <div className="search-input">
          <input type="text" placeholder="Enter name" />
          <button className="submit-button">Search</button>
        </div>
      )}
      {searchType === 'skills' && (
        <div className="search-input">
          <input type="text" placeholder="Enter skills" />
          <button className="submit-button">Search</button>
        </div>
      )}
    </div>
  );
};

export default Search;
