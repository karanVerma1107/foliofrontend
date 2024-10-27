import React, { useState } from 'react';
import './Search.css'; // Ensure this CSS file is correctly linked
import { useDispatch, useSelector } from 'react-redux';
import { getUserByUsername, getUserBySkill } from '../actions/searchingAction';

const Search = () => {
  const [searchType, setSearchType] = useState(null);
  const [input, setInput] = useState('');

  const dispatch = useDispatch();
  const { users = [], loading, error } = useSelector(state => state.getUserByName);
  const {skillusers = [] } = useSelector(state=> state.getSkilledUser);

  const handleSearchByName = () => setSearchType('name');
  const handleSearchBySkills = () => setSearchType('skills');



  const handleInputChange = (event) => {
    const value = event.target.value;
    setInput(value);

    if (value) {
      // Dispatch the appropriate action based on the search type
      if (searchType === 'name') {
        dispatch(getUserByUsername(value));
      } else if (searchType === 'skills') {
        dispatch(getUserBySkill(value));
      }
    }
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

      {searchType && (
        <div className="search-input">
          <input
            type="text"
            placeholder={searchType === 'name' ? "Enter name" : "Enter skills"}
            onChange={handleInputChange}
            value={input}
          />
          <button className="submit-button">Search</button>
        </div>
      )}
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}


      {searchType === 'name' && users.length > 0 && (
        <div className="user-suggestions-container">
          {users.map(user => (
            <div key={user._id} className="user-suggestion">
              <img src={user.display_pic} alt={user.userName} className="user-image" style={{ border: "1px solid white", width: "2.99vmax", height: "2.99vmax" }} />
              <div className="user-name">
                <a href={`/${user.userName}`}>{user.userName}</a>
              </div>
            </div>
          ))}
        </div>
      )}
   

   {searchType === 'skills' && skillusers.length > 0 && (
        <div className="user-suggestions-container">
          {skillusers.map(user => (
            <div key={user._id} className="user-suggestion">
              <img src={user.display_pic} alt={user.userName} className="user-image" style={{ border: "1px solid white", width: "2.99vmax", height: "2.99vmax" }} />
              <div className="user-name">
                <a href={`/${user.userName}`}>{user.userName}</a>
              </div>
            </div>
          ))}
        </div>
      )}


    </div>
  );
};

export default Search;
