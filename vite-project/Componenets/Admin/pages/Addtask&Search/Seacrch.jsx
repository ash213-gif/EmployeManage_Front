import React, { useState, useEffect, useContext } from 'react';
import { Getusers } from '../../../Context/Getusefunction'; // Adjust the import based on your context file

export default function Search() {
  const [query, setQuery] = useState('');
  const { getusers } = useContext(Getusers); 
  const [searchResults, setSearchResults] = useState([]); 

  // Handle input change
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  // Handle search action
  const handleSearch = () => {
    console.log('Searching for:', query);
  };

  // Use effect to filter suggestions based on query
  useEffect(() => {
    if (Array.isArray(getusers)) {
      const filteredUsers = getusers.filter(user =>
        user.name.toLowerCase().includes(query.toLowerCase()) || // Assuming user has a 'name' property
        user.email.toLowerCase().includes(query.toLowerCase()) // You can include more properties to search
      );
      setSearchResults(filteredUsers); // Update search results
    } else {
      console.error('getusers is not an array:', getusers);
      setSearchResults([]); // Reset search results if data is not valid
    }
  }, [query, getusers]); // Run effect when query or getusers changes

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search Your Employee."
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
      <div className="search-results">
        {searchResults.length > 0 ? (
          searchResults.map(user => (
            <div key={user.id} className="search-result-item">
              <p>{user.name} - {user.email}</p> 
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}
